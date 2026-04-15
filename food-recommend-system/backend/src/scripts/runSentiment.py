import os
from datetime import datetime

from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import pipeline
from pyvi import ViTokenizer

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "food_recommend_db")

if not MONGODB_URI:
    raise ValueError("Thiếu MONGODB_URI trong file .env")

MODEL_NAME = "pqthinh232/HCMUS-vietnamese-phobert-restaurant-sentiment-analysis"
# 0 = negative, 1 = positive, 2 = neutral

LABEL_MAP = {
    "LABEL_0": 0,
    "LABEL_1": 1,
    "LABEL_2": 2,

    "NEGATIVE": 0,
    "POSITIVE": 1,
    "NEUTRAL": 2,

    "Negative": 0,
    "Positive": 1,
    "Neutral": 2,

    0: 0,
    1: 1,
    2: 2,
    "0": 0,
    "1": 1,
    "2": 2,
}


def normalize_label(output_label):
    text = str(output_label).strip()

    if output_label in LABEL_MAP:
        return LABEL_MAP[output_label]

    if text in LABEL_MAP:
        return LABEL_MAP[text]

    upper_text = text.upper()
    if upper_text in LABEL_MAP:
        return LABEL_MAP[upper_text]

    raise ValueError(f"Không nhận diện được label từ model: {output_label}")

def preprocess_text_for_phobert(text):
    text = str(text).strip()
    if not text:
        return ""
    return ViTokenizer.tokenize(text)

def main():
    print("Đang tải model...")
    clf = pipeline(
        "text-classification",
        model=MODEL_NAME,
        tokenizer=MODEL_NAME,
        truncation=True,
        max_length=256,
    )

    print("Đang kết nối MongoDB...")
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    reviews_col = db["reviews"]

    query = {
        "comment_clean": {"$exists": True, "$nin": [None, ""]}
    }

    reviews = list(reviews_col.find(query))
    print(f"Tìm thấy {len(reviews)} review cần gán nhãn sentiment.")

    updated_count = 0
    skipped_count = 0

    for review in reviews:
        text = review.get("comment_clean", "")
        if not text or not str(text).strip():
            skipped_count += 1
            continue

        try:
            processed_text = preprocess_text_for_phobert(text)
            result = clf(processed_text)[0]
            pred_label = normalize_label(result["label"])

            reviews_col.update_one(
                {"_id": review["_id"]},
                {
                    "$set": {
                        "sentiment": pred_label,
                        "sentiment_updated_at": datetime.utcnow()
                    }
                }
            )
            updated_count += 1

            if updated_count % 50 == 0:
                print(f"Đã update {updated_count} review...")

        except Exception as e:
            print(f"Lỗi ở review _id={review.get('_id')}: {e}")
            skipped_count += 1

    print("Hoàn tất.")
    print(f"Updated: {updated_count}")
    print(f"Skipped/Error: {skipped_count}")

    client.close()

if __name__ == "__main__":
    main()
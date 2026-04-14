import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import pipeline

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "food_recommend_db")

if not MONGODB_URI:
    raise ValueError("Thiếu MONGODB_URI trong file .env")

MODEL_NAME = "pqthinh232/HCMUS-phobert-vietnamese-restaurant-sentiment-analysis"

# User đã chốt mapping:
# 0 = neutral, 1 = tích cực, 2 = tiêu cực
# Model Hugging Face thường trả label kiểu LABEL_0, LABEL_1, LABEL_2
# Ta map trực tiếp về số nguyên.
LABEL_MAP = {
    "LABEL_0": 2,
    "LABEL_1": 1,
    "LABEL_2": 0,

    "NEUTRAL": 2,
    "POSITIVE": 1,
    "NEGATIVE": 0,

    "Neutral": 2,
    "Positive": 1,
    "Negative": 0,

    0: 2,
    1: 1,
    2: 0,
    "0": 2,
    "1": 1,
    "2": 0,
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

    # chỉ chạy cho review có comment_clean và sentiment còn null / chưa có
    query = {
        "comment_clean": {"$exists": True, "$nin": [None, ""]},
        "$or": [
            {"sentiment": {"$exists": False}},
            {"sentiment": None}
        ]
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
            result = clf(text)[0]
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
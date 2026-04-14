import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "food_recommend_db")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
reviews_col = db["reviews"]

# Bước 1: đổi tạm 0 -> 99
reviews_col.update_many(
    {"sentiment": 0},
    {"$set": {"sentiment": 99}}
)

# Bước 2: đổi 2 -> 0
reviews_col.update_many(
    {"sentiment": 2},
    {"$set": {"sentiment": 0}}
)

# Bước 3: đổi 99 -> 2
reviews_col.update_many(
    {"sentiment": 99},
    {"$set": {"sentiment": 2}}
)

print("Đã hoán đổi nhãn sentiment 0 và 2.")
client.close()
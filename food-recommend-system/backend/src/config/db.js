const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "food_recommend_db";

if (!uri) {
  throw new Error("Thiếu MONGODB_URI trong file .env");
}

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);

    console.log("Đã kết nối MongoDB Atlas");
    console.log(`Database đang dùng: ${dbName}`);

    return db;
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database chưa được kết nối. Hãy gọi connectDB() trước.");
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
};
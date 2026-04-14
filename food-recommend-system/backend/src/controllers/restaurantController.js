const { getDB } = require("../config/db");

async function getAllRestaurants(req, res) {
  try {
    const db = getDB();

    const restaurants = await db
      .collection("restaurants")
      .find({})
      .toArray();

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Lỗi lấy danh sách nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách nhà hàng" });
  }
}

async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();

    const restaurant = await db
      .collection("restaurants")
      .findOne({ restaurant_id: id });

    if (!restaurant) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Lỗi lấy chi tiết nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết nhà hàng" });
  }
}

async function getReviewsByRestaurantId(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();

    const reviews = await db
      .collection("reviews")
      .find({ restaurant_id: id })
      .toArray();

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Lỗi lấy review của nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy review" });
  }
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getReviewsByRestaurantId,
};
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


//line chart Thiện làm

// Hàm bổ trợ để parse chuỗi "X tháng trước" thành index tháng
const parseReviewTime = (timeStr) => {
  if (!timeStr) return 0;
  const match = timeStr.match(/\d+/);
  if (!match) return 0; // "vừa xong", "1 tuần trước" -> tháng hiện tại (cách 0 tháng)
  return parseInt(match[0]);
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    // Giả sử bạn dùng Model Restaurant của Mongoose
    const restaurant = await Restaurant.findById(id); 
    
    if (!restaurant) return res.status(404).json({ message: "Không tìm thấy" });

    // --- LOGIC TẠO DATA BIỂU ĐỒ ---
    const trendData = [];
    const now = new Date();
    
    // 1. Khởi tạo mảng 6 tháng (từ 5 tháng trước đến tháng hiện tại)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = `T${d.getMonth() + 1}`;
      trendData.push({ month: monthLabel, count: 0, offset: i });
    }

    // 2. Đếm review dựa vào trường "time"
    restaurant.reviews.forEach(rev => {
      const monthsAgo = parseReviewTime(rev.time);
      if (monthsAgo <= 5) {
        // Tìm tháng tương ứng trong mảng trendData
        const target = trendData.find(item => item.offset === monthsAgo);
        if (target) target.count++;
      }
    });

    // Trả về dữ liệu nhà hàng kèm theo trendData đã xử lý
    res.json({
      ...restaurant._doc,
      reviewTrend: trendData.map(({month, count}) => ({month, count})) 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
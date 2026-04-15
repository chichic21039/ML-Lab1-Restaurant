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
  const str = timeStr.toLowerCase();
  const match = str.match(/\d+/);
  const value = match ? parseInt(match[0]) : 0;

  if (str.includes("năm")) return 12; // Nếu là năm thì cho đi chỗ khác (ngoài 6 tháng)
  if (str.includes("tháng")) return value; // Đúng là chữ tháng thì lấy số tháng
  
  // Nếu là "tuần", "ngày", "giờ", "vừa xong" -> Trả về 0 (nghĩa là tháng hiện tại)
  return 0; 
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id); // Giả sử model là Restaurant

    const now = new Date();
    const reviewTrend = [];

    // Tạo khung 6 tháng
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      reviewTrend.push({
        month: `T${d.getMonth() + 1}`,
        positive: 0,
        neutral: 0,
        negative: 0,
        monthsAgo: i
      });
    }

    // Duyệt qua từng review và dùng hàm parseReviewTime
    restaurant.reviews.forEach(rev => {
      const monthsAgo = parseReviewTime(rev.time); // XÀI HÀM Ở ĐÂY
      
      if (monthsAgo >= 0 && monthsAgo <= 5) {
        const target = reviewTrend.find(t => t.monthsAgo === monthsAgo);
        if (target) {
          if (rev.sentiment === 1) target.positive++;
          else if (rev.sentiment === 2) target.neutral++;
          else if (rev.sentiment === 0) target.negative++;
        }
      }
    });

    // Trả dữ liệu về cho Frontend
    res.json({
      ...restaurant._doc,
      reviewTrend: reviewTrend.map(({month, positive, neutral, negative}) => 
        ({month, positive, neutral, negative}))
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const express = require("express");
const {
  getAllRestaurants,
  getRestaurantById,
  getReviewsByRestaurantId,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.get("/:id/reviews", getReviewsByRestaurantId);

module.exports = router;
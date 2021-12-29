const express = require("express");

const router = express.Router();

const {
  orderHistoryUser,
  orderItem,
  recentOrder,
} = require("../controllers/orderController");

//dashboard route - getting recent orders of the user
router.get("/:userId", recentOrder);

//Order-Items Route
router.post("/orderItem", orderItem);

//Order History Route
router.get("/orderHistory/:userId", orderHistoryUser);

module.exports = router;

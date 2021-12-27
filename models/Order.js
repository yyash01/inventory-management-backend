const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item_id: {
    type: String,
    require: true,
    unique: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  item_count: {
    type: Number,
    default: 0,
  },
  remark: {
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  total_cost: {
    type: Number,
    default: 0,
  },
  issued_items: [
    { item_name: String, item_count: Number, description: String },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;

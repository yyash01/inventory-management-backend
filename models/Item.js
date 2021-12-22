const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  expected_cost: {
    type: Double,
    default: 0.0,
  },
  item_decription: {
    type: String,
    default: "",
  },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;

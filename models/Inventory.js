const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  item_count: {
    type: Number,
    default: 0,
  },
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;

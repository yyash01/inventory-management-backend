const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  bill_no: {
    type: String,
    require: true,
    unique: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  bill_amount: {
    type: Double,
    required: true,
  },
  bill_date: {
    type: Date,
    required: true,
  },
});

const Bill = mongoose.model("bill", billSchema);

module.exports = Bill;

const Order = require("../models/Order");

module.exports.recentOrder = (req, res) => {
  const userID = req.params.userID;
  Order.find({ userid: userID }, (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json(err);
    } else {
      result.sort();
      res.status(200).json({ result });
    }
  });
};

//user order Item
module.exports.orderItem = async (req, res) => {
  const { userID, ItemID, ItemCount, Remark, IssuedItems } = req.body;
  const newOrder = new Order({
    userid: userID,
    item_id: ItemID,
    item_count: ItemCount,
    remark: Remark,
    order_date: Date.now(),
    issued_items: IssuedItems,
  });
  Order.create(newOrder, (err, order) => {
    if (err) {
      res.status(200).json(err);
    } else {
      //save order
      order.save();
      res.status(200).json({ Order: order });
    }
  });
};

//getting specific user order History: for user
module.exports.orderHistoryUser = function (req, res) {
  Order.find({ user_id: req.params.userId }, (err, orders) => {
    if (!err) {
      res.status(200).json({ orders: orders });
    } else {
      res.send(err);
    }
  });
};

const User = require("../models/User");
const Order = require("../models/Order");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//dashboard route - getting recent orders of the user
router.get("/:userID", (req, res) => {
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
});

//user order Item
router.post("/orderItem", async (req, res) => {
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
});

router.post("/register", async (req, res) => {
  const { username, email, password, department } = req.body;
  try {
    const user = await User.create({ username, email, password, department });
    // generate salt to hash password
    const salt = await bcrypt.genSalt();
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save();

    res.status(200).json({ userID: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ userID: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

module.exports = router;

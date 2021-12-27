const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

app.use(express.json());

//db connection
connectDB();

//routes

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Page for Login the invenotry-management-system");
});

app.listen(4000, () => {
  console.log("Server Started in port 4000");
});

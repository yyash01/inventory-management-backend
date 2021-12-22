const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

app.use(express.json());

//routes

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Page for Login the invenotry-management-system");
});

//db connection
const dbURI =
  "mongodb+srv://lnmiit:iamyash@inventory-management-ba.dcfmo.mongodb.net/inventory-management-backend";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(3000, function () {
      console.log("Server is running on Port 3000");
    })
  )
  .catch((err) => console.log(err));

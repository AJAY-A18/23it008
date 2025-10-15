const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://bala:pass-1234@cluster0.cqecylk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const orderSchema = new mongoose.Schema({
  name: String,
  foodItem: String,
  price: Number,
  isVeg: Boolean
});

const Order = mongoose.model("Order", orderSchema);

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order placed successfully!" });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

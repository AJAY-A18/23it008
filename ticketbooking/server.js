const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Booking = require('./bookingModel');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ticketDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error: " + err));

app.post("/add", async (req, res) => {
  const data = new Booking(req.body);
  await data.save();
  res.send("Ticket booked successfully!");
});

app.get("/list", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

app.put("/update/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, req.body);
  res.send(" Booking updated successfully!");
});

app.delete("/delete/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.send(" Booking deleted!");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000/"));

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie: String,
  date: String,
  seats: [String]
});

module.exports = mongoose.model("Booking", BookingSchema);

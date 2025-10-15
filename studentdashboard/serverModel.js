const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  m1: Number,
  m2: Number,
  m3: Number,
  total: Number,
  grade: String
});

module.exports = mongoose.model("Student", StudentSchema);

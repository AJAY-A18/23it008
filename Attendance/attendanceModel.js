const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    name: String,
    roll: String,
    date: String,
    status: String
});
module.exports = mongoose.model("Attendance", AttendanceSchema);
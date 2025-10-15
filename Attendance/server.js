const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Attendance = require('./attendanceModel')
const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/webtech")
.then(() => console.log("db connected"))
.catch((err) => console.log("error: " + err))

app.post("/add", async (req, res) => {
    const data = new Attendance(req.body);
    await data.save();
    res.send("Attendance added!");
})

app.get("/list", async (req, res) => {
    const data = await Attendance.find();
    res.json(data);
})

app.put('/update/:id', async (req, res) => {
    await Attendance.findByIdAndUpdate(req.params.id, req.body);
    res.send("Attendance updated!");
})

app.delete('/delete/:id', async (req, res) => {
    await Attendance.findByIdAndDelete(req.params.id);
    res.send("Attendance deleted");
})

app.listen(5000, () => console.log("server running on http://localhost:5000/"));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./studentModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://bala:pass-1234@cluster0.cqecylk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Add student
app.post("/add", async (req, res) => {
  const data = new Student(req.body);
  await data.save();
  res.send("Student saved!");
});

students// List all 
app.get("/list", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

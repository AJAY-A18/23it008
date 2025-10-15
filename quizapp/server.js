const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Score = require('./scoremodel');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://bala:pass-1234@cluster0.cqecylk.mongodb.net/quizDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(" DB Connection Error:", err));


app.post("/add", async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || score === undefined) {
      return res.status(400).send("Name and score are required!");
    }

    const data = new Score({ name, score });
    await data.save();
    res.send(" Score saved successfully!");
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/scores", async (req, res) => {
  const scores = await Score.find().sort({ createdAt: -1 });
  res.json(scores);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

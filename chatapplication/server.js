const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/chatApp")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Error: " + err));

// Chat Schema
const chatSchema = new mongoose.Schema({
    username: String,
    message: String,
    time: { type: Date, default: Date.now }
});

const Chat = mongoose.model("Chat", chatSchema);

// Add a new message
app.post("/add", async (req, res) => {
    const data = new Chat(req.body);
    await data.save();
    res.send("Message sent!");
});

// Get all messages
app.get("/list", async (req, res) => {
    const data = await Chat.find().sort({ time: 1 }); // sort by time ascending
    res.json(data);
});

// Delete a message
app.delete("/delete/:id", async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    res.send("Message deleted!");
});

// Start server
app.listen(5000, () => console.log("Server running at http://localhost:5000"));

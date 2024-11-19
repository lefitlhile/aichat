import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'Jesus@1989',
  database: 'chattable',
});

// Test route
app.get('/', (req, res) => {
  return res.json("From Backend Side");
});

// Get all chats
app.get('/chats', (req, res) => {
  const sql = "SELECT * FROM chats ORDER BY created_at DESC";  // Fetch chats in reverse order
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Save new chat (both user query and AI response)
app.post('/chats', (req, res) => {
  const { userMessage, aiResponse } = req.body;

  if (!userMessage || !aiResponse) {
    return res.status(400).json({ error: "User message and AI response are required" });
  }

  const sql = "INSERT INTO chats (user_message, ai_response) VALUES (?, ?)";
  db.query(sql, [userMessage, aiResponse], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save chat", details: err });
    }
    return res.status(201).json({ message: "Chat saved successfully", chatId: result.insertId });
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// server.mjs or server.js if "type": "module" is set in package.json
import express from 'express';  // Use import instead of require
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';  // Importing node-fetch as an ESM

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// JWT secret key for encoding and decoding tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Gemini API setup
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to fetch AI response from Gemini API
const fetchGeminiResponse = async (prompt) => {
  try {
    const response = await fetch('https://gemini-api-url.com/v1/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    throw new Error('Error fetching Gemini response: ' + error.message);
  }
};

// Register user
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user', error: err });
        }
        const user = { id: results.insertId, username };
        const token = jwt.encode({ userId: user.id }, JWT_SECRET);
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.encode({ userId: user.id }, JWT_SECRET);
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Create chat history
app.post('/api/chat', authMiddleware, async (req, res) => {
  const { user_message } = req.body;
  const userId = req.user.userId;

  try {
    const gemini_response = await fetchGeminiResponse(user_message);

    // Store chat in the database
    pool.query(
      'INSERT INTO chats (user_id, user_message, ai_response) VALUES (?, ?, ?)',
      [userId, user_message, gemini_response],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error processing chat', error: err });
        }
        res.status(201).json({
          id: results.insertId,
          user_id: userId,
          user_message: user_message,
          ai_response: gemini_response,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error processing chat', error });
  }
});

// Fetch chat history
app.get('/api/chat/history', authMiddleware, (req, res) => {
  const userId = req.user.userId;

  pool.query(
    'SELECT * FROM chats WHERE user_id = ? ORDER BY timestamp DESC',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching chat history', error: err });
      }
      res.json(results);
    }
  );
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
  database:'chattable'
})

app.get('/', (re, res)=>{
  return res.json("From Backend Side");
})

app.get('/chats',( req, res)=> {
const sql = "SELECT * FROM chats";
db.query(sql,(err, data)=> {
    if (err) return res.json(err);
    return res.json(data);

})
})

app.listen(5000,()=> {
  console.log("Connected")
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 建立 SQLite
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// 建立資料表
db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    gender TEXT,
    address TEXT,
    phone TEXT,
    birthday TEXT,
    email TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

// Nodemailer 設定
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wenying823@gmail.com',
    pass: 'jazbnytznakeaqof'
  }
});

// API: 新增聯絡資料
app.post('/api/contacts', (req, res) => {
  const { name, gender, address, phone, birthday, email } = req.body;
  const sql = 'INSERT INTO contacts (name, gender, address, phone, birthday, email) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [name, gender, address, phone, birthday, email], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // 寄通知信
    const mailOptions = {
      from: 'wenying823@gmail.com',
      to: email,
      subject: '您的聯絡資料已成功登錄',
      text: `聯絡資料：\n姓名：${name}\n電子郵件：${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('寄信失敗:', error);
      } else {
        console.log('寄信成功:', info.response);
      }
    });

    res.json({ message: '聯絡資料已儲存', id: this.lastID });
  });
});

// API: 取得所有聯絡資料
app.get('/api/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API: 刪除聯絡資料
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contacts WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: '找不到指定的聯絡人' });
    }
    res.json({ message: '聯絡人已刪除' });
  });
});

// API: 取得單一聯絡人
app.get('/api/contacts/:id', (req, res) => {
  const sql = 'SELECT * FROM contacts WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: '找不到聯絡人' });
    res.json(row);
  });
});

// API: 更新聯絡人
app.put('/api/contacts/:id', (req, res) => {
  const { name, gender, address, phone, birthday, email } = req.body;
  const sql = `
    UPDATE contacts
    SET name = ?, gender = ?, address = ?, phone = ?, birthday = ?, email = ?
    WHERE id = ?
  `;
  db.run(sql, [name, gender, address, phone, birthday, email, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: '找不到聯絡人' });
    const mailOptions = {
      from: 'wenying823@gmail.com',
      to: email,
      subject: '您的聯絡資料已成功更新',
      text: `聯絡資料：\n姓名：${name}\n電子郵件：${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('寄信失敗:', error);
      } else {
        console.log('寄信成功:', info.response);
      }
    });
    res.json({ message: '聯絡人已更新' });
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

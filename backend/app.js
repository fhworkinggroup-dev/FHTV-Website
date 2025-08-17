const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// 数据库连接
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: '127_0_0_1',
  password: 'fhtvwebsite',
  database: '127_0_0_1'
});

app.use(cors());
app.use(bodyParser.json());

// 邮箱发送工具
let mailConfig = {
  host: 'smtp.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'your@email.com',
    pass: 'yourpassword'
  }
};
let transporter = nodemailer.createTransport(mailConfig);

// 获取系统设置
app.get('/api/system/settings', (req, res) => {
  db.query('SELECT `key`, `value` FROM settings', (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});

// 修改直播源
app.post('/api/system/live-source', (req, res) => {
  const { value } = req.body;
  db.query('UPDATE settings SET value=? WHERE `key`="live_source"', [value], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({success: true});
  });
});

// 用户注册
app.post('/api/auth/register', (req, res) => {
  const { email, password, code } = req.body;
  db.query('SELECT * FROM verifications WHERE email=? AND code=? AND type="register" AND expires_at > NOW()', [email, code], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({error: '验证码错误或过期'});
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
      if (err) return res.status(500).json({error: err});
      res.json({success: true});
    });
  });
});

// 用户登录
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email=? AND password=?', [email, password], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({error: '账号或密码错误'});
    res.json({success: true, user: results[0]});
  });
});

// 发送验证码
app.post('/api/auth/send-code', (req, res) => {
  const { email, type } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000);
  db.query('INSERT INTO verifications (email, code, expires_at, type) VALUES (?, ?, ?, ?)', [email, code, expires, type], (err) => {
    if (err) return res.status(500).json({error: err});
    transporter.sendMail({
      from: mailConfig.auth.user,
      to: email,
      subject: 'FHTV验证码',
      text: `您的验证码是：${code}，10分钟内有效。`
    }, (err) => {
      if (err) return res.status(500).json({error: err});
      res.json({success: true});
    });
  });
});

// 找回密码
app.post('/api/auth/forgot', (req, res) => {
  const { email, code, newPassword } = req.body;
  db.query('SELECT * FROM verifications WHERE email=? AND code=? AND type="forgot" AND expires_at > NOW()', [email, code], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({error: '验证码错误或过期'});
    db.query('UPDATE users SET password=? WHERE email=?', [newPassword, email], (err) => {
      if (err) return res.status(500).json({error: err});
      res.json({success: true});
    });
  });
});

// 节目管理
app.get('/api/program', (req, res) => {
  db.query('SELECT * FROM programs', (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});
app.post('/api/program', (req, res) => {
  const { name, description, cover } = req.body;
  db.query('INSERT INTO programs (name, description, cover) VALUES (?, ?, ?)', [name, description, cover], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({success: true});
  });
});

// 节目表管理
app.get('/api/schedule', (req, res) => {
  db.query('SELECT * FROM schedules', (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});
app.post('/api/schedule', (req, res) => {
  const { program_id, start_time, end_time } = req.body;
  db.query('INSERT INTO schedules (program_id, start_time, end_time) VALUES (?, ?, ?)', [program_id, start_time, end_time], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({success: true});
  });
});

// 用户管理
app.get('/api/user', (req, res) => {
  db.query('SELECT id, email, role, status, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});

// 系统设置（邮箱配置等）
app.post('/api/system/email', (req, res) => {
  const { host, port, user, pass } = req.body;
  mailConfig = { host, port, secure: port == 465, auth: { user, pass } };
  transporter = nodemailer.createTransport(mailConfig);
  db.query('UPDATE settings SET value=? WHERE `key`="email_config"', [JSON.stringify(mailConfig)], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({success: true});
  });
});

app.listen(port, () => {
  console.log(`FHTV backend running at http://localhost:${port}`);
});
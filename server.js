// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medistock'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});


app.post('/register', (req, res) => {
  const { name, pass, email } = req.body;
  const sql = 'INSERT INTO users (name, pass, email) VALUES (?, ?, ?)';
  db.query(sql, [name, pass, email], (err, result) => {
    if (err) return res.status(500).send('Error registering');
    res.send('Registered successfully');
  });
});


app.post('/submit', (req, res) => {
  const { name, pass } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND pass = ?';
  db.query(sql, [name, pass], (err, result) => {
    if (err) return res.status(500).send('DB Error');
    if (result.length > 0) {
      res.send('Login Success');
    } else {
      res.send('Invalid Credentials');
    }
  });
});

app.post('/generatepass', (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT pass FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0) return res.status(404).send('Email not found');

    const password = result[0].pass;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email@.com',
        pass: 'opfx yrwc exqf ffkt'
      }
    });

    const mailoptions = {
      from: 'email@gmail.com',
      to: email,
      subject: 'Your MediStock Password',
      text: `Your password is: ${password}`
    };

    transporter.sendMail(mailoptions, (error, info) => {
      if (error) return res.status(500).send('Email failed');
      res.send('Password sent to your email');
    });
  });
});


app.post('/addstock', (req, res) => {
  const { name, quantity, price, expiry } = req.body;
  const sql = 'INSERT INTO stock (name, quantity, price, expiry) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, quantity, price, expiry], (err, result) => {
    if (err) return res.status(500).send('Failed to add stock');
    res.send('Stock added successfully');
  });
});


app.get('/viewstock', (req, res) => {
  db.query('SELECT * FROM stock', (err, result) => {
    if (err) return res.status(500).send('DB Error');
    res.json(result);
  });
});


app.post('/order', (req, res) => {
  const { medicinename, quantity, email } = req.body;
  const sql = 'INSERT INTO orders (medicinename, quantity, orderdate, status, email) VALUES (?, ?, CURDATE(), ?, ?)';
  db.query(sql, [medicinename, quantity, 'Pending', email], (err, result) => {
    if (err) {
      console.log("error: "+err)
      return res.status(500).send('Order failed');
    }
    

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email@gmail.com',
        pass: 'opfx yrwc exqf ffkt'
      }
    });

    const mailoptions = {
      from: 'semail@gmail.com',
      to: email,
      subject: 'Order Confirmation - MediStock',
      text: `You have ordered ${quantity} units of ${medicinename}`
    };

    transporter.sendMail(mailoptions, (error, info) => {
      if (error) return res.status(500).send('Email failed');
      res.send('Order placed & email sent');
    });
  });
});

app.post('/dispatch', (req, res) => {
  const { medicinename, quantity, hospital } = req.body;
  const qty = parseInt(quantity);

  const checkSql = 'SELECT quantity FROM stock WHERE medicinename = ?';
  db.query(checkSql, [medicinename], (err, result) => {
    if (err) return res.status(500).send('Error checking stock');
    if (result.length === 0) return res.status(404).send('Medicine not found');

    const currentStock = result[0].quantity;
    if (currentStock < qty) return res.send('Not enough stock to dispatch');

    const updatedStock = currentStock - qty;
    const updateSql = 'UPDATE stock SET quantity = ? WHERE medicinename = ?';

    db.query(updateSql, [updatedStock, medicinename], (err2, result2) => {
      if (err2) return res.status(500).send('Failed to dispatch');

      let msg = 'Stock dispatched successfully.';
      if (updatedStock < 10 && updatedStock > 0) msg += ' Low stock. Reorder soon.';
      else if (updatedStock === 0) msg += ' Stock is now zero.';

      res.send(msg);
    });
  });
});




app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

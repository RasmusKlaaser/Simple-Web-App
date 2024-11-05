// Import necessary modules
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { hashPassword } = require('./auth');

const app = express();
const port = 3000;

// Middleware for serving static files from "public" folder and parsing form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'password1234',
  database: 'HAJUSRAKENDUS',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route for the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the form submission page
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Route for the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route for the about page (optional)
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { username, password, email, message } = req.body;

  if (!username || !password || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  const hashedPassword = hashPassword(password);
  const query = 'INSERT INTO accounts (username, password, email, message) VALUES (?, ?, ?, ?)';

  db.query(query, [username, hashedPassword, email, message], (err) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error inserting user');
    }
    
    res.send(`<h1>Form successfully submitted</h1>
              <p>Thank you, ${username}! Your email: "${email}"</p>
              <p>Your message: "${message}"</p>
              <a href="/form">Submit another form</a>`);
  });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error checking login:', err);
      return res.status(500).send('Error checking login');
    }

    if (results.length > 0) {
      res.send(`<h1>Welcome, ${username}!</h1><a href="/">Go back</a>`);
    } else {
      res.send('<h1>Invalid username or password</h1><a href="/">Try again</a>');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

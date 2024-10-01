const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const mysql = require('mysql');
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'password1234',
  database: 'HAJUSRAKENDUS', // Replace with your actual database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Endpoint to insert a new user
app.post('/submit-form', (req, res) => {
  const { username, password, email } = req.body; // Get values from the request body

  const query = 'INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)';
  
  db.query(query, [username, password, email], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error inserting user');
    }
    
    res.send(`<h1>Vorm saadeti edukalt</h1><p>Aitäh, ${username}! Teie email: "${email}"</p><a href="/form">Esita veel üks vorm</a>`);
  });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check the credentials against the database
  const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error checking login:', err);
      return res.status(500).send('Error checking login');
    }

    if (results.length > 0) {
      res.send(`<h1>Tere tulemast, ${username}!</h1><a href="/">Mine tagasi</a>`);
    } else if (username === "") {
      res.send('<h1>Kasutajanimi on nõutud</h1>');
    } else if (password === "") {
      res.send('<h1>Parool on nõutud</h1>');
    } else {
      res.send('<h1>Vale kasutajanimi või parool</h1><a href="/">Proovi uuesti</a>');
    }
  });
});


// Serve form page
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});


// Serve about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Serve contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

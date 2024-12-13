const express = require('express');
const app = express();
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

var booksRouter = require('../routes/books');
var bookRouter = require('../routes/book');
var reviewsRouter = require('../routes/reviews');
const { isProd } = require('../config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
  origin: process.env.WEBSITE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const secretKey = process.env.SECRET_KEY;

const port = process.env.PORT || 8080;

function verifyToken(req, res, next) {
  const header = req.header('Authorization') || '';
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access not authorizated' });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token not valid' });
  }
}

app.post('/login', (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }
    if (
      username === process.env.API_USERNAME &&
      password === process.env.API_PASSWORD
    ) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '24h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.use(logger('dev'));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/books', verifyToken, booksRouter);
app.use('/book', verifyToken, bookRouter);
app.use('/reviews', verifyToken, reviewsRouter);

app.listen(port, () => {
  console.log(`Server listening in the port ${port}`);
});

module.exports = app;

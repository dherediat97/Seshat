const express = require('express');
const app = express();
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var booksRouter = require('../routes/books');
var bookRouter = require('../routes/book');
var reviewsRouter = require('../routes/reviews');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:5173', process.env.WEBSITE_URL];
const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/api/books', booksRouter);
app.use('/api/book', bookRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(port, () => {
  console.log(`Server listening in the port ${port}`);
});

module.exports = app;

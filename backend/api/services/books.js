const { query } = require('../bbdd/database');
const { config } = require('../config');
const helper = require('../utils/helper');

async function fetchBooks(page = 1) {
  const offset = helper.getOffset(page, config.pageSize);
  const results = await query(
    `SELECT id,isbn,title,date_published,author_name,publisher_name, num_pages, img_url
     FROM books ORDER BY date_published ASC LIMIT ${config.pageSize} OFFSET ${offset}`
  );

  const resultsCount = await query(`SELECT COUNT(*) as count from books`);
  const count = resultsCount[0].count;

  const books = helper.emptyOrRows(results);
  const info = {
    page,
    totalResults: count,
    totalPages: parseInt(count / config.pageSize + 1),
    pageSize: config.pageSize,
  };

  return {
    books,
    info,
  };
}

async function insertBooks(body) {}

async function updateBooks(params) {}

async function deleteBooks(params) {}

module.exports = {
  fetchBooks,
  insertBooks,
  updateBooks,
  deleteBooks,
};

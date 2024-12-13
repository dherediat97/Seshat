const { query } = require('../bbdd/database');
const helper = require('../utils/helper');

async function fetchReviews(id, page = 1) {
  const results = await query(
    `SELECT id, title, author_name,content,book_id FROM reviews WHERE book_id=${id}`
  );
  const reviews = helper.emptyOrRows(results);
  const info = { page };

  return {
    reviews,
    info,
  };
}

async function insertReview(body) {
  try {
    const { title, author_name, content, book_id } = body;

    const results = await query(
      `INSERT INTO reviews(title,author_name,content,book_id) VALUES (?,?,?,?)`,
      [title, author_name, content, book_id]
    );
    return results.insertId;
  } catch (error) {
    return undefined;
  }
}

async function updateReview(body) {
  try {
    const { id, title, author_name, content, book_id } = body;

    const results = await query(
      `UPDATE reviews SET title=?,author_name=?,content=?, book_id=?  WHERE id=${id}`,
      [title, author_name, content, book_id]
    );

    return results.changedRows;
  } catch (error) {
    return 0;
  }
}

async function deleteReview(reviewId) {
  try {
    const results = await query(`DELETE FROM reviews WHERE id=${reviewId}`);
    return results.affectedRows;
  } catch (error) {
    return undefined;
  }
}

module.exports = {
  fetchReviews,
  insertReview,
  updateReview,
  deleteReview,
};

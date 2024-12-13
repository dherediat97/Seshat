const { query } = require('../bbdd/database');
async function fetchBook(isbn) {
  const results = await query(
    `SELECT id, isbn, title, author_name, publisher_name, num_pages, img_url FROM books WHERE isbn=${isbn}`
  );
  if (results.length > 0) return results[0];
}

async function insertBook(body) {
  try {
    const {
      isbn,
      title,
      date_published,
      author_name,
      publisher_name,
      num_pages,
      img_url,
    } = body;

    const results = await query(
      `INSERT INTO books(isbn,title,date_published,author_name,publisher_name, num_pages, img_url) VALUES (?,?,?,?,?,?,?)`,
      [
        isbn,
        title,
        date_published,
        author_name,
        publisher_name,
        num_pages,
        img_url,
      ]
    );
    return results.insertId;
  } catch (error) {
    return undefined;
  }
}

async function updateBook(body) {
  try {
    const {
      isbn,
      title,
      date_published,
      author_name,
      publisher_name,
      num_pages,
      img_url,
    } = body;

    const results = await query(
      `UPDATE books SET isbn=?,title=?,date_published=?,author_name=?,publisher_name=?, num_pages=?, img_url=? WHERE isbn=${isbn}`,
      [
        isbn,
        title,
        date_published,
        author_name,
        publisher_name,
        num_pages,
        img_url,
      ]
    );

    return results.changedRows;
  } catch (error) {
    return 0;
  }
}

async function deleteBook(bookId) {
  try {
    const results = await query(`DELETE FROM books WHERE id=${bookId}`);
    return results.affectedRows;
  } catch (error) {
    return undefined;
  }
}

module.exports = {
  fetchBook,
  insertBook,
  updateBook,
  deleteBook,
};

var express = require('express');
const { fetchBook, deleteBook, updateBook } = require('../services/book');
var router = express.Router();

/* GET book */
router.get('/:isbn', async function (req, res, next) {
  try {
    const book = await fetchBook(req.params.isbn);
    res.json(book);
  } catch (error) {
    console.error('Ocurrió un error al traer el libro. Error: ', error);
    next(error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const bookDeleted = await deleteBook(req.params.id);
    if (bookDeleted !== 0) res.json({ message: 'deleted successfully' });
    else res.json({ message: 'not deleted' });
  } catch (error) {
    console.error('Ocurrió un error al borrar el libro. Error: ', error);
    next(error);
  }
});

router.put('/', async function (req, res, next) {
  try {
    const bookUpdated = await updateBook(req.body);
    if (bookUpdated >= 1) res.json({ message: 'update successfully' });
    else res.json({ message: 'not updated' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar el libro. Error: ', error);
    next(error);
  }
});

module.exports = router;

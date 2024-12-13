var express = require('express');
var router = express.Router();
const {
  fetchReviews,
  insertReview,
  deleteReview,
  updateReview,
} = require('../services/review');

/* GET review */
router.get('/:id', async function (req, res, next) {
  try {
    const reviews = await fetchReviews(req.params.id);
    res.json(reviews);
  } catch (error) {
    console.error(
      'Ocurrió un error al traer todas las reseñas. Error: ',
      error
    );
    next(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    const reviewCreated = await insertReview(req.body);
    if (reviewCreated !== undefined)
      res.json({ message: 'created successfully' });
    else res.json({ message: 'not created' });
  } catch (error) {
    console.error('Ocurrió un error al insertar la reseña. Error: ', error);
    next(error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const reviewDeleted = await deleteReview(req.params.id);
    if (reviewDeleted !== 0) res.json({ message: 'deleted successfully' });
    else res.json({ message: 'not deleted' });
  } catch (error) {
    console.error('Ocurrió un error al borrar la reseña. Error: ', error);
    next(error);
  }
});

router.put('/', async function (req, res, next) {
  try {
    const reviewUpdated = await updateReview(req.body);
    if (reviewUpdated >= 1) res.json({ message: 'update successfully' });
    else res.json({ message: 'not updated' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar la reseña. Error: ', error);
    next(error);
  }
});

module.exports = router;

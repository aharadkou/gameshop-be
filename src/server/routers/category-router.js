const status = require('http-status');
const router = require('express').Router();
const categoryDAO = require('../../dao/category-dao');

router.get('/', (request, response) => {
  categoryDAO.getAllCategories().then(
      categories => response.json(categories)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;

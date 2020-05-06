const status = require('http-status');
const router = require('express').Router();
const categoryDAO = require('../../dao/category-dao');

router.get('/', (request, response) => {
  const selectedIds = (request.query.selectedIds || []).map(selectedId => +selectedId);
  categoryDAO.getAllCategories(request.query.filter, selectedIds).then(
      categories => response.json(categories)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;

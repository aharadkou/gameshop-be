const Category = require('../models/category');
const getFilterRegExp = require('../utils/string-utils').getFilterRegExp;

function getAllCategories(filter, selectedIds) {
  const searchRegExp = getFilterRegExp(filter);
  const findParams = {
    name: searchRegExp,
    _id: {
      $nin: selectedIds
    }
  };
  return Category.find(findParams).sort({ name: 'asc' });
}

module.exports = {
  getAllCategories
};

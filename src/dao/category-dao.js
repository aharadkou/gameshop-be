const Category = require('../models/category');

function getAllCategories() {
  return Category.find({}).sort({ name: 'asc' });
}

module.exports = {
  getAllCategories
};

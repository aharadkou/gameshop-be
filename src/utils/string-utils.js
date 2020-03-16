const PATTERN_BLANK = require('../constants/constants').PATTERN_BLANK;

function getFilterRegExp(filter) {
  return new RegExp(normalizeFilterString(filter), 'i');
}

function normalizeFilterString(filter) {
  if (!filter || PATTERN_BLANK.test(filter)) {
    return '';
  } else {
    return filter.trim();
  }
}

function sortArrayToObject(sortArray) {
  const sortObject = {};
  if (sortArray && sortArray.forEach) {
    sortArray.forEach(sortCriteria => {
      const parts = sortCriteria.split(',');
      const sortField = parts[0];
      const sortOrder = parts[1];
      sortObject[sortField] = sortOrder;
    });
  }
  return sortObject;
}

module.exports = {
  normalizeFilterString,
  getFilterRegExp,
  sortArrayToObject
};

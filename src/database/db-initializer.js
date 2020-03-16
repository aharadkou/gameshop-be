const Game = require('../models/game');
const Category = require('../models/category');
const gamesJson = require('./json/games.json');
const categoriesJson = require('./json/categories.json');

function initGames() {
  return Game.deleteMany({}).then(() =>
    Game.insertMany(gamesJson)
  );
}

function initCategories() {
  return Category.deleteMany({}).then(() =>
    Category.insertMany(categoriesJson)
  );
}


function init() {
  initCategories().then(() => initGames());
}

module.exports = {
  init
};

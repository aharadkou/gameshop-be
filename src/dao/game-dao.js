const Game = require('../models/game');
const getFilterRegExp = require('../utils/string-utils').getFilterRegExp;
const sortArrayToObject = require('../utils/string-utils').sortArrayToObject;
const CUSTOM_LABELS = require('../constants/constants').CUSTOM_LABELS;

function getAllGames(page, limit, sort, filter, categories) {
  const searchRegExp = getFilterRegExp(filter);
  const findParams = {
    title: searchRegExp
  };
  if (categories && categories[0] && +categories[0] !== -1) {
    findParams.categories = {
      $elemMatch: {
        $eq: +categories[0]
      }
    };
  }
  return Game.paginate(
      findParams,
      { page, limit, sort: sortArrayToObject(sort), customLabels: CUSTOM_LABELS, populate: 'categories' }
  );
}

function getGamesByIds(ids) {
  return Game.find({
    _id: {
      $in: ids
    }
  }).populate('categories');
}

function addGame(game) {
  const gameModel = new Game(game);
  return gameModel.save(game);
}

function updateGame(id, game) {
  game._id = id;
  return Game.findByIdAndUpdate({ _id: id }, Game, { new: true }).populate('categories');
}

function deleteGameById(id) {
  return Game.findByIdAndDelete(id);
}

module.exports = {
  getAllGames,
  getGamesByIds,
  addGame,
  updateGame,
  deleteGameById
};

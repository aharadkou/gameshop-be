const status = require('http-status');
const router = require('express').Router();
const gameDAO = require('../../dao/game-dao');

router.get('/', (request, response) => {
  let gamesPromise;
  if (request.query.ids) {
    gamesPromise = gameDAO.getGamesByIds(request.query.ids);
  } else {
    gamesPromise = gameDAO.getAllGames(
        request.query.page, request.query.limit, request.query.sort, request.query.filter, request.query.categories
    );
  }
  gamesPromise.then(
      games => response.json(games)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;

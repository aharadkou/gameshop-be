const status = require('http-status');
const router = require('express').Router();
const gameDAO = require('../../dao/game-dao');
const multer = require('multer');
const upload = multer({ dest: 'public/img/uploaded' });
const validation = require('../middleware/validation');
const authentication = require('../middleware/authentication');
const jwtAuthz = require('express-jwt-authz');
const JWTZ_CONFIG = require('../../constants/constants').JWTZ_CONFIG;

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

router.post('/',
    upload.single('image'),
    authentication,
    jwtAuthz(['add:product'], JWTZ_CONFIG),
    normalizeBody,
    validation.validateGame,
    (request, response) => {
      gameDAO.addGame(request.body).then(
          game => response.json(game)
      ).catch(
          error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
      );
    });

router.put('/:id', upload.single('image'),
    authentication,
    jwtAuthz(['update:product'], JWTZ_CONFIG),
    normalizeBody,
    validation.validateGame,
    (request, response) => {
      gameDAO.updateGame(request.params.id, request.body).then(
          game => response.json(game)
      ).catch(
          error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
      );
    });

function normalizeBody(request, response, next) {
  if (request.body.id) {
    request.body.id = +request.body.id;
  }
  request.body.categories = JSON.parse(request.body.categories);
  request.body.price = +request.body.price;
  if (request.file) {
    request.body.imageUrl = `/img/uploaded/${request.file.filename}`;
  }
  next();
}

router.delete('/:id', authentication, jwtAuthz(['delete:product'], JWTZ_CONFIG), (request, response) => {
  gameDAO.deleteGameById(request.params.id).then(
      game => response.json(game)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;

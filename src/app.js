const express = require('express');
const app = express();
const cors = require('cors');
const DEFAULT_PORT = require('./constants/constants').DEFAULT_PORT;
const gameRouter = require('./server/routers/game-router');
const orderRouter = require('./server/routers/order-router');
const categoryRouter = require('./server/routers/category-router');
const dbInitializer = require('./database/db-initializer');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/games', gameRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.listen(DEFAULT_PORT, () => {
  console.log(`Server started! Listening ${DEFAULT_PORT} port!`);
  if (process.argv && process.argv[2] && process.argv[2] === 'dbreinit') {
    dbInitializer.init();
  }
});

const mongoose = require('mongoose');

const DB_URL = require('../constants/constants').DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
  console.log('Error occurred from the database!');
});
db.once('open', () => {
  console.log('Successfully opened the database!');
});

module.exports = mongoose;

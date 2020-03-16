const DB_URL = 'mongodb://127.0.0.1:27017/gameshop-db';

const DEFAULT_PORT = 3000;

const PATTERN_BLANK = /^\s*$/;

const INCLUDE_IN_AGGREGATION = 1;

const CUSTOM_LABELS = {
  totalDocs: 'totalItems',
  docs: 'data'
};

module.exports = {
  DB_URL,
  DEFAULT_PORT,
  PATTERN_BLANK,
  INCLUDE_IN_AGGREGATION,
  CUSTOM_LABELS
};

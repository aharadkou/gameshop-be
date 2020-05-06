const DB_URL = 'mongodb://127.0.0.1:27017/gameshop-db';

const DEFAULT_PORT = 3000;

const PATTERN_BLANK = /^\s*$/;

const CUSTOM_LABELS = {
  totalDocs: 'totalItems',
  docs: 'data'
};

const JWTZ_CONFIG = { customScopeKey: 'permissions' };

module.exports = {
  DB_URL,
  DEFAULT_PORT,
  PATTERN_BLANK,
  CUSTOM_LABELS,
  JWTZ_CONFIG
};

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authentication = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-vhc0s9zz.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://gameshop-api',
  issuer: 'https://dev-vhc0s9zz.eu.auth0.com/',
  algorithms: ['RS256']
});


module.exports = authentication;

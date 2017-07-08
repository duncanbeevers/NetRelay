// require the babel hook so future require calls are transpiled by Babel
require('babel-register')({
  ignore: /node_modules\/(?!koa\-bestest\-router)/
});
// require the rest of the app that needs to be transpiled after the hook
const app = require('./src/app');

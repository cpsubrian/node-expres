assert = require('assert');
util = require('util');
http = require('http');
expres = require('../');
clone = require('clone');
superagent = require('superagent');

var server;

response = function () {
  var res = clone(expres.methods);
  res.__proto__ = http.ServerResponse.prototype;
  return res;
};

get = function (path, cb, done) {
  superagent.get('http://localhost:9000' + path, cb);
};

respond = function (cb) {
  server.on('request', cb);
};

createServer = function (done) {
  server = http.createServer(expres.middleware).listen(9000, done);
};

closeServer = function (done) {
  server.close();
  done();
};
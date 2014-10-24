// Generated by CoffeeScript 1.8.0
(function() {
  var cliPath, docpadPath, expect, expectPath, joe, pathUtil, renderPath, rootPath, superagent,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  pathUtil = require('path');

  expect = require('chai').expect;

  joe = require('joe');

  superagent = require('superagent');

  docpadPath = pathUtil.join(__dirname, '..', '..');

  rootPath = pathUtil.join(docpadPath, 'test');

  renderPath = pathUtil.join(rootPath, 'render');

  expectPath = pathUtil.join(rootPath, 'render-expected');

  cliPath = pathUtil.join(docpadPath, 'bin', 'docpad');

  process.on('uncaughtException', function(err) {
    throw err;
  });

  joe.suite('docpad-custom-server', function(suite, test) {
    var docpad, docpadConfig, port, serverExpress, serverHttp;
    docpadConfig = null;
    docpad = null;
    serverExpress = null;
    serverHttp = null;
    port = null;
    test('createInstance', function(done) {
      docpadConfig = {
        port: port = 9780,
        rootPath: rootPath,
        logLevel: (process.env.TRAVIS_NODE_VERSION != null) || __indexOf.call(process.argv, '-d') >= 0 ? 7 : 5,
        skipUnsupportedPlugins: false,
        catchExceptions: false,
        serverExpress: serverExpress = require('express')(),
        serverHttp: serverHttp = require('http').createServer(serverExpress).listen(port)
      };
      serverExpress.get('/hello', function(req, res) {
        return res.send(200, 'hello world');
      });
      return docpad = require('../main').createInstance(docpadConfig, done);
    });
    test('server action', function(done) {
      return docpad.action('server', done);
    });
    test('server bound', function(done) {
      expect(docpad.serverExpress, "serverExpress was bound").to.eql(serverExpress);
      expect(docpad.serverHttp, "serverHttp was bound").to.eql(serverHttp);
      return superagent.get("http://127.0.0.1:" + port + "/hello").timeout(5 * 1000).end(function(err, res) {
        expect(err, "no error").to.not.exist;
        expect(res.text, "server was extended correctly").to.eql('hello world');
        return done();
      });
    });
    return test('destroy instance', function(done) {
      return docpad.destroy(done);
    });
  });

}).call(this);

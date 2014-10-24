// Generated by CoffeeScript 1.6.3
(function() {
  var checkDocPad, startDocPad,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  checkDocPad = function() {
    var docpadUtil;
    if (__indexOf.call(process.argv, '--global') >= 0 || __indexOf.call(process.argv, '--g') >= 0) {
      return startDocPad();
    }
    docpadUtil = require('../lib/util');
    if (docpadUtil.isLocalDocPadExecutable()) {
      return startDocPad();
    }
    if (docpadUtil.getLocalDocPadExecutableExistance() === false) {
      return startDocPad();
    }
    return docpadUtil.startLocalDocPadExecutable();
  };

  startDocPad = function() {
    var ConsoleInterface, DocPad, action;
    DocPad = require('../lib/docpad');
    ConsoleInterface = require('../lib/interfaces/console');
    action = process.argv.slice(1).join(' ').indexOf('deploy') !== -1 ? 'load' : false;
    return DocPad.createInstance({
      action: action
    }, function(err, docpad) {
      if (err) {
        return console.log(err.stack);
      }
      return new ConsoleInterface({
        docpad: docpad
      }, function(err, consoleInterface) {
        if (err) {
          return console.log(err.stack);
        }
        return consoleInterface.start();
      });
    });
  };

  checkDocPad();

}).call(this);

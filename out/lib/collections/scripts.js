// Generated by CoffeeScript 1.8.0
(function() {
  var ElementsCollection, ScriptsCollection, typeChecker,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  typeChecker = require('typechecker');

  ElementsCollection = require('./elements');

  ScriptsCollection = (function(_super) {
    __extends(ScriptsCollection, _super);

    function ScriptsCollection() {
      return ScriptsCollection.__super__.constructor.apply(this, arguments);
    }

    ScriptsCollection.prototype.add = function(values, opts) {
      var key, value, _i, _len;
      opts || (opts = {});
      if (opts.defer == null) {
        opts.defer = true;
      }
      if (opts.async == null) {
        opts.async = false;
      }
      opts.attrs || (opts.attrs = '');
      if (typeChecker.isArray(values)) {
        values = values.slice();
      } else if (values) {
        values = [values];
      } else {
        values = [];
      }
      if (opts.defer) {
        opts.attrs += "defer=\"defer\" ";
      }
      if (opts.async) {
        opts.attrs += "async=\"async\" ";
      }
      for (key = _i = 0, _len = values.length; _i < _len; key = ++_i) {
        value = values[key];
        if (typeChecker.isString(value)) {
          if (value[0] === '<') {

          } else if (value.indexOf(' ') === -1) {
            values[key] = "<script " + opts.attrs + " src=\"" + value + "\"></script>";
          } else {
            values[key] = "<script " + opts.attrs + ">" + value + "</script>";
          }
        }
      }
      return ScriptsCollection.__super__.add.call(this, values, opts);
    };

    return ScriptsCollection;

  })(ElementsCollection);

  module.exports = ScriptsCollection;

}).call(this);

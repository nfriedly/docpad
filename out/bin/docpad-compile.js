// Generated by CoffeeScript 1.6.3
(function() {
  var DocPad, action, docpadConfig, getArgument;

  DocPad = require('../lib/docpad');

  getArgument = function(name, value, defaultValue) {
    var argumentIndex, result;
    if (value == null) {
      value = null;
    }
    if (defaultValue == null) {
      defaultValue = null;
    }
    result = defaultValue;
    argumentIndex = process.argv.indexOf("--" + name);
    if (argumentIndex !== -1) {
      result = value != null ? value : process.argv[argumentIndex + 1];
    }
    return result;
  };

  action = (getArgument('action', null, 'generate') + ' ' + getArgument('watch', 'watch', '')).trim();

  docpadConfig = {};

  docpadConfig.rootPath = getArgument('rootPath', null, process.cwd());

  docpadConfig.outPath = getArgument('outPath', null, docpadConfig.rootPath + '/out');

  docpadConfig.srcPath = getArgument('srcPath', null, docpadConfig.rootPath + '/src');

  docpadConfig.documentsPaths = (function() {
    var documentsPath;
    documentsPath = getArgument('documentsPath');
    if (documentsPath != null) {
      if (documentsPath === 'auto') {
        documentsPath = docpadConfig.srcPath;
      }
    } else {
      documentsPath = docpadConfig.srcPath + '/documents';
    }
    return [documentsPath];
  })();

  docpadConfig.port = (function() {
    var port;
    port = getArgument('port');
    if (port && isNaN(port) === false) {
      port = parseInt(port, 10);
    }
    return port;
  })();

  docpadConfig.renderSingleExtensions = (function() {
    var renderSingleExtensions;
    renderSingleExtensions = getArgument('renderSingleExtensions', null, 'auto');
    if (renderSingleExtensions === 'true' || renderSingleExtensions === 'yes') {
      renderSingleExtensions = true;
    } else if (renderSingleExtensions === 'false' || renderSingleExtensions === 'no') {
      renderSingleExtensions = false;
    }
    return renderSingleExtensions;
  })();

  DocPad.createInstance(docpadConfig, function(err, docpad) {
    if (err) {
      return console.log(err.stack);
    }
    return docpad.action(action, function(err) {
      if (err) {
        return console.log(err.stack);
      }
      return console.log('OK');
    });
  });

}).call(this);

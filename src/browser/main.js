/* globals KevoreeModuleLoader */

var pkg = require('../../package.json');
var ConsolePrinter = require('../ConsolePrinter');

KevoreeModuleLoader.register(pkg.name, pkg.version, ConsolePrinter);

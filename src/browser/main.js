/* globals KevoreeModuleLoader */

var pkg = require('../../package.json');
var ConsolePrinter = require('./ConsolePrinterUIDecorator');

KevoreeModuleLoader.register(pkg.name, pkg.version, ConsolePrinter);

var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
  toString: 'ConsolePrinter',
  tdef_version: 1,

  uiInitialState: { messages: [], maxLines: 25 },

  in_input: function inputHandler(msg) {
    var line = this.getName() + '>' + msg;
    var newMessages;
    if (this.ui.state.messages.length === this.ui.state.maxLines) {
      newMessages = [].concat(this.ui.state.messages).concat(msg);
      newMessages.shift();
    } else {
      newMessages = [].concat(this.ui.state.messages).concat(msg);
    }
    this.ui.setState({ messages: newMessages });
    console.log(line);
  },

  getUi: function uiFactory() {
    return require('./browser/ConsolePrinterUI');
  }
});

module.exports = ConsolePrinter;

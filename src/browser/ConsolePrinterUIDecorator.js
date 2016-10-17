var React = require('react');
var cx = require('classnames');

var ConsolePrinter = require('../ConsolePrinter');
var s = require('./styles.css');

var ConsolePrinterUIDecorator = ConsolePrinter.extend({

  construct: function () {
    this.uiState = { messages: [], maxLines: 25 };
  },

  in_input: function (msg) {
    this._super(msg);
    this.uiState.messages = [].concat(this.uiState.messages).concat(msg);
    if (this.ui) {
      this.ui.setState({ messages: this.uiState.messages });
    }
  },

  uiFactory: function () {
    return React.createClass({
      getInitialState: function () {
        return this.props.instance.uiState;
      },

      onClear: function () {
        this.setState({ messages: [] });
      },

      onMaxLineChange: function (event) {
        var newState = { maxLines: event.target.value };
        var currLength = this.state.messages.length;
        if (newState.maxLines < currLength) {
          var newMessages = [].concat(this.state.messages);
          newMessages.splice(0, currLength - (currLength - newState.maxLines));
          newState.messages = newMessages;
        }
        this.setState(newState);
      },

      render: function () {
        return (
          <div className={s.container}>
            <div className={s.topPanel}>
              <button className={s.btn} onClick={this.onClear}>Clear</button>
              <input
                type='number'
                value={this.state.maxLines}
                onChange={this.onMaxLineChange}
                className={cx(s.maxLines, s.formControl, s.inputSm, s.pullRight)}
              />
            </div>
            <div className={s.listPanel}>
              {this.state.messages.length === 0 && (
                <p className={s.textCenter}>
                  <em>- empty -</em>
                </p>
              )}
              {this.state.messages.length > 0 && (
                <ul>
                  {this.state.messages.map(function (msg, i) {
                    return (
                      <li key={i} className={s.listGroupItem}>{msg}</li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        );
      }
    });
  }
});

module.exports = ConsolePrinterUIDecorator;

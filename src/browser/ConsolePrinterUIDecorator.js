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
    var ReactConsolePrinter = React.createClass({
      getInitialState: function () {
        return this.props.instance.uiState;
      },

      onClear: function () {
        this.props.instance.uiState.messages = [];
        this.setState({ messages: this.props.instance.uiState.messages });
      },

      onMaxLineChange: function (event) {
        this.props.instance.uiState.maxLines = event.target.value;
        var currLength = this.props.instance.uiState.messages.length;
        if (this.props.instance.uiState.maxLines < currLength) {
          this.props.instance.uiState.messages = [].concat(this.props.instance.uiState.messages);
          this.props.instance.uiState.messages.splice(0, currLength - (currLength - this.props.instance.uiState.maxLines));
        }
        this.setState(this.props.instance.uiState);
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

    ReactConsolePrinter.propTypes = {
      instance: React.PropTypes.object.isRequired
    };

    return ReactConsolePrinter;
  }
});

module.exports = ConsolePrinterUIDecorator;

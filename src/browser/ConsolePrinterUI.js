var cx = require('classnames');

var s = require('./styles.css');

var div = React.createFactory('div');
var p = React.createFactory('p');
var ul = React.createFactory('ul');
var li = React.createFactory('li');
var em = React.createFactory('em');
var button = React.createFactory('button');
var input = React.createFactory('input');

var ConsolePrinterUI = React.createClass({

  onClear: function () {
    this.setState({ messages: [] });
  },

  onMaxLineChange: function (maxLines) {
    if (this.state.messages.length > maxLines) {
      var newMessages = [].concat(this.state.messages);
      newMessages.splice(0, (newMessages.length - (newMessages.length - maxLines)));
      this.setState({ message: newMessages });
    }
    this.setState({ maxLines: maxLines });
  },

  render: function () {
    return (
      <div className={s.container}>
        <div className={s.topPanel}>
          <button className={s.btn} onClick={this.onClear}>Clear</button>
          <input
            type='number'
            value={props.instance.ui.maxLines}
            onChange={this.onMaxLineChange}
            className={cx(s.maxLines, s.formControl, s.inputSm, s.pullRight)}
          />
        </div>
        <div className={s.listPanel}>
          {this.props.instance.ui.messages.length === 0 && (
            <p className={s.textCenter}>
              <em>- empty -</em>
            </p>
          )}
          {this.props.instance.ui.messages.length > 0 && (
            <ul>
              {this.props.instance.ui.messages.map(function (msg, i) {
                <li key={i} className={s.listGroupItem}>{msg}</li>
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
});

ConsolePrinterUI.propTypes = {
  instance: React.PropTypes.object.isRequired,
};

module.exports = ConsolePrinterUI;

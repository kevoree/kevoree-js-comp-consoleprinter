var Comp = React.createClass({
  getInitialState: function() {
    return this.props.instance.uiState;
  },
  render: function() {
    return (
      <div>
        <p>Name:
          <strong>{this.state.name}</strong>
        </p>
        <p>Started:
          <strong>{this.state.started + ''}</strong>
        </p>
        <p>Messages:</p>
        <ul>
          {this.state.messages.map(function(msg, i) {
            return (
              <li key={i}>{msg}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    var instance = {
      uiState: {
        name: 'comp0',
        started: true,
        messages: []
      },
      input: function(msg) {
        if (this.ui && this.ui.state) {
          this.uiState.messages = [].concat(this.ui.state.messages).concat(msg);
          this.ui.setState(this.uiState);
        } else {
          this.uiState.messages.push(msg);
        }
      }
    };

    return {mount: true, instance: instance};
  },

  componentDidMount: function() {
    var count = 0;
    setInterval(function() {
      this.state.instance.input('New message ' + count++);
      this.setState({instance: this.state.instance});
    }.bind(this), 1000);
  },

  toggleMount: function() {
    this.setState({
      mount: !this.state.mount
    });
  },

  render: function() {
    return (
      <div>
        <div style={{
          float: 'left'
        }}>
          <button onClick={this.toggleMount}>{this.state.mount
              ? 'Unmount'
              : 'Mount'}</button>
          {this.state.mount && (
            <Comp instance={this.state.instance} ref={function(n) { this.state.instance.ui = n; }.bind(this)} />
          )}
        </div>
        <pre style={{ float: 'right', paddingRight: 20 }}>
          <code>{JSON.stringify(this.state.instance.uiState, null, 2)}</code>
        </pre>
      </div>
    );
  }
});

module.exports = App;

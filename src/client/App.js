import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {};
  componentDidMount() {
    fetch('/api/test')
      .then(resp => resp.json())
      .then(json => {
        this.setState({apiMessage: json.message})
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          {this.state.apiMessage}
        </p>
      </div>
    );
  }
}

export default App;

import * as React from 'react';
import logo from './logo.svg';
import './App.less';
import * as css from './App.modules.less';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className={css.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <p>version: {global.env.version}</p>
        </header>
      </div>
    );
  }
}

export default App;

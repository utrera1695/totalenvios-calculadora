import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './app.css';
import store from './store';
import Page from './app/pages/page.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Page />
        </div>
      </Provider>
    );
  }
}

export default App;

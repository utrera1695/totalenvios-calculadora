import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './app.css';
import store from './store';
import Page from './app/pages/page';
import entregador from './assets/svg/shipping.svg';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <img className='fondo' src={entregador} alt='entregador' />
        <div className='App'>
          <Page />
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Provider } from 'react-redux'
import moment from 'moment'

import store from './store';

class App extends Component {

  render() {
     moment.locale('de')
    return (
      <div>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </div>
    )
  }
}

export default App;

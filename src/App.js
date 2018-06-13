import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import moment from 'moment'

class App extends Component {

  render() {
     moment.locale('de')
    return (
      <div>
        <Routes/>
        </div>
    )
  }
}

export default App;

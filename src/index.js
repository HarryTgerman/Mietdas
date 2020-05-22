import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'

const config = {
    apiKey: "xx",
    authDomain: "xx",
    databaseURL: "xx",
    projectId: "xx",
    storageBucket: "xx",
    messagingSenderId: "xx"
  };
 firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

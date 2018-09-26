import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCs7-kFe_LEpr71uN-F51Gmt7Mz8-SRrCY",
    authDomain: "mietdas-93abf.firebaseapp.com",
    databaseURL: "https://mietdas-93abf.firebaseio.com",
    projectId: "mietdas-93abf",
    storageBucket: "gs://mietdas-93abf",
    messagingSenderId: "153684144787"
  };
 firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

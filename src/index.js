import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'

const config = {
   apiKey: "AIzaSyAFz-ejwedKgcQqSmSFilbTuNaw3pEEMas",
   authDomain: "layoutapp-1505919280943.firebaseapp.com",
   databaseURL: "https://layoutapp-1505919280943.firebaseio.com",
   projectId: "layoutapp-1505919280943",
   storageBucket: "layoutapp-1505919280943.appspot.com",
   messagingSenderId: "80726112937"
 }
 firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

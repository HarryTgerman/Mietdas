const functions = require('firebase-functions');

exports.makeNewMessage = functions.database.ref('app/messages/{wildCard}/message/{wildcardMessge}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val().message;
      console.log('Uppercasing', context.params, original);

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.parent.parent.parent.child('newmessage').push(original);
    });

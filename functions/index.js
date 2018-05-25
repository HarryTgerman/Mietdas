const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


exports.makeNewRentrequest =  functions.database.ref('app/users/{wildCard}/anfragen/{wildcardMessge}')
.onCreate((snapshot, context) => {
  let sendToMail =snapshot.val().ArtikelOwnerEmail
  let name = snapshot.val().name;
  let article = snapshot.val().cardHeading;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;


  var transporter = nodemailer.createTransport({
      host: 'alfa3210.alfahosting-server.de',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: 'web29692594p2',
        pass: '7XZkop5L'
      },
      tls:{
        rejectUnauthorized: false
      }
  });

    transporter.use('compile',hbs({
      viewPath: './emailTemplate',
      extName: '.hbs'
    }))


return   transporter.sendMail({
      from: 'noreply@mietdas.com', // sender address
      to: sendToMail, // list of receivers
      subject: 'Sie haben eine neue Anfrage',
      template: 'index',
      context: {
        name: name,
        article: article,
        von: von,
        bis: bis,
        }
      }, function (err, info) {
         if(err)
           console.log(err)
         else
           console.log(info);
      });

})

exports.deletMitteilung =  functions.database.ref('app/users/{wildCard}/gestellteAnfragen/{wildcardMessge}')
.onDelete((snapshot, context) => {
  let sendToMail =snapshot.val().email
  let article = snapshot.val().cardHeading;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;


  var transporter = nodemailer.createTransport({
      host: 'alfa3210.alfahosting-server.de',
      port: 465,
      secure: false,
      auth: {
        user: 'web29692594p2',
        pass: '7XZkop5L'
      },
      tls:{
        rejectUnauthorized: false
      }
  });
    transporter.use('compile',hbs({
      viewPath: './emailTemplate',
      extName: '.hbs'
    }))


return   transporter.sendMail({
      from: 'noreply@mietdas.com', // sender address
      to: sendToMail, // list of receivers
      subject: 'Ihre Anfrage für ' +article+ ' wurde leieder abgelehnt',
      template: 'mitteilung',
      context: {
        article: article,
        von: von,
        bis: bis,
      }
    },  (err, info)=> {
         if(err)
           console.log(err)
         else
           console.log(info);
      });

})

exports.submitPayout =  functions.database.ref('app/payments/{wildCard}/{wildcardRef}')
.onCreate((snapshot, context) => {
  let uid =snapshot.val().paymentData.anfrage.uid
  let article = snapshot.val().paymentData.anfrage.cardHeading;
  let von = snapshot.val().paymentData.anfrage.mietbeginn;
  let bis = snapshot.val().paymentData.anfrage.mietende;
  let amount = snapshot.val().paymentData.anfrage.umsatz * 0.88 + "00";

  admin.database().ref('app/users/'+uid).child('bankData').once('value', snap=>{
    console.log(snap.val(), uid,
  article,
  von,
  bis,
  amount);
  })


})

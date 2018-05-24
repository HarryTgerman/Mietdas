const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')



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


   transporter.sendMail({
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

exports.deletMitteilung =  functions.database.ref('app/users/{wildCard}/mitteilung/{wildcardMessge}')
.onDelete((snapshot, context) => {
  let sendToMail =snapshot.val().anfrage.email
  let article = snapshot.val().anfrage.cardHeading;
  let von = snapshot.val().anfrage.mietbeginn;
  let bis = snapshot.val().anfrage.mietende;


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


   transporter.sendMail({
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

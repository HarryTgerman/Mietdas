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



//Bestätigungen für die Zahlung
exports.zahlungsMitteilung =  functions.database.ref('app/payments/{wildCard}')
.onCreate((snapshot, context) => {
  let artikelName =snapshot.val().artikelName;
  let mieterName =snapshot.val().mieterName;
  let vermieterName =snapshot.val().vermieterName;
  let vermieterId = snapshot.val().vermieterId;
  let mieterId = snapshot.val().mieterId;
  let mieterTelefon =snapshot.val().telefon;
  let preis =snapshot.val().preis;
  let paymentMethod =snapshot.val().paymentMethod;
  let vermieterEmail =snapshot.val().vermieterEmail;
  let mieterEmail =snapshot.val().mieterEmail;
  let rechnungsadresse =snapshot.val().rechnugsadresse;
  let abholadresse =snapshot.val().abholadresse;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;

  admin.database().ref('app/users/'+vermieterId).once('value', snap=>{
    //Bankdaten
    let bankName = snap.val().bankData.bankName;
    let bic = snap.val().bankData.bic;
    let iban = snap.val().bankData.iban;
    let kontoinhaber = snap.val().bankData.kontoinhaber;
    let paypal = snap.val().bankData.paypal;
    //Adresse
    let straße = snap.val().straße;
    let plz = snap.val().plz;
    let stadt = snap.val().stadt;
    let bundesLand = snap.val().bundesLand;
    //Kontaktdaten
    let vermieterTelefon =snap.val().telefon;

  })

  //mail an vermieter---------------------------
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
      subject: 'Zahlung für den folgenden Artikel ' +artikelName+ ' wurde getätigt',
      template: 'vermieterMitteilung',
      context: {
        artikelName: artikelName,
        von: von,
        bis: bis,
        preis: preis,
        paymentMethod: paymentMethod,
        mieterName: mieterName,
        mieterTelefon: mieterTelefon,
        rechnungsadresse: rechnungsadresse,
        straße: straße,
        plz: plz,
        stadt: stadt,
        bundesLand: bundesLand,
      }
    },  (err, info)=> {
         if(err)
           console.log(err)
         else
           console.log(info);
      });

      //mail an Mieter-----------------------------
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
          subject: 'Du hast die Zahlung für den folgenden Artikel ' +artikelName+ ' getätigt',
          template: 'mieterMitteilung',
          context: {
            artikelName: artikelName,
            von: von,
            bis: bis,
            preis: preis,
            paymentMethod: paymentMethod,
            vermieterName: vermieterName,
            vermieterTelefon: vermieterTelefon,
            straße: straße,
            plz: plz,
            stadt: stadt,
            bundesLand: bundesLand,

          }
        },  (err, info)=> {
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
      subject: 'Ihre Anfrage für ' +article+ ' wurde leider abgelehnt',
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

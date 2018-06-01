const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;

admin.initializeApp(functions.config().firebase);




const gcs = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.fileResizer =  functions.database.ref('app/card/{wildCardcat}/{wildcardMessge}')
// .onCreate((snapshot, context) => {
//   let imageArr = snapshot.val().imageArr
//   return imageArr.map(i=>{
//     functions.storage.refFromURL(i).object().on(event => {
//         const object = event.data;
//         const bucket = object.bucket;
//         const contentType = object.contentType;
//         const filePath = object.name;
//         console.log('File change detected, function execution started');
//
//         if (object.resourceState === 'not_exists') {
//             console.log('We deleted a file, exit...');
//             return;
//         }
//
//         if (path.basename(filePath).startsWith('resized-')) {
//             console.log('We already renamed that file!');
//             return;
//         }
//
//         const destBucket = gcs.bucket(bucket);
//         const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//         const metadata = { contentType: contentType };
//         return destBucket.file(filePath).download({
//             destination: tmpFilePath
//         }).then(() => {
//             return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
//         }).then(() => {
//             return destBucket.upload(tmpFilePath, {
//                 destination: 'resized-' + path.basename(filePath),
//                 metadata: metadata
//             })
//         });
//     })
//   })
// }




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
  let vermieterEmail =snapshot.val().vermieterEmail;
  let vermieterTelefon =snapshot.val().vermieterTelefon;
  let preis =snapshot.val().preis;
  let paymentMethod =snapshot.val().paymentMethod;
  let vermieterEmail =snapshot.val().vermieterEmail;
  let mieterEmail =snapshot.val().mieterEmail;
  let rechnungsadresse =snapshot.val().rechnugsadresse;
  let abholadresse =snapshot.val().abholadresse;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;

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
        rechnungsadresse: rechnungsadresse,
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
            mieterName: mieterName,
            vermieterEmail: vermieterEmail,
            vermieterTelefon: vermieterTelefon,
            abholadresse: abholadresse,

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

exports.submitPayout =  functions.database.ref('app/payments/{wildCard}/{wildcardRef}')
.onCreate((snapshot, context) => {
  let uid =snapshot.val().paymentData.anfrage.uid
  let email =snapshot.val().paymentData.anfrage.email
  let name =snapshot.val().paymentData.anfrage.name.split(' ')
  let firstName= name[0]
  let lastName= name[1]
  let article = snapshot.val().paymentData.anfrage.cardHeading;
  let von = snapshot.val().paymentData.anfrage.mietbeginn;
  let bis = snapshot.val().paymentData.anfrage.mietende;
  let amount = snapshot.val().paymentData.anfrage.umsatz * 0.88 + "00";

  admin.database().ref('app/users/'+uid).once('value', snap=>{
    let dateOfBirth = snap.val().geburtsDatum
    let bankData = snap.val().bankData
    request.post({headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:'https://pal-test.adyen.com/pal/servlet/Payout/v30/storeDetailAndSubmitThirdParty',
                body: {
                    "merchantAccount" : "MietDasCOM",
                    "recurring": {
                        "contract" : "RECURRING,PAYOUT"
                    },

                    "amount" : {
                        "value" : amount,
                        "currency" : "EUR"
                    },
                    "bank" : {
                        "bankName" : bankData.bankName,
                        "iban" : bankData.iban,
                        "countryCode" : "DE",
                        "ownerName" : bankData.kontoinhaber
                    },

                    "reference" : "Mietdas Auszahlung",
                    "shopperEmail" : email,
                    "shopperIP" : uid,
                    "shopperReference" : "Mietdas Auszahlung",
                    "shopperName" : {
                        "firstName" : firstName,
                        "lastName" : lastName
                    },
                    "dateOfBirth" : dateOfBirth,
                    "entityType" : "Company",
                    "nationality" : "DE"
                }
          },(err, response, body) => {
            if (err) throw err;
            console.log(response, body);
            if(reponse){
            request.post({headers: {'content-type' : 'application/x-www-form-urlencoded'},
                        url:'https://pal-test.adyen.com/pal/servlet/Payout/v30/submitThirdParty',
                        body: {
                        "amount" : {
                            "currency" : "EUR",
                            "value" : amount
                        },

                        "merchantAccount" : "MietDasCOM",

                        "recurring" : {
                            "contract" : "PAYOUT"
                        },

                        "reference" : "MietdasPayout",
                        "shopperEmail" : email,
                        "shopperReference" : "MietdasPayout",
                        "shopperName" : {
                            "firstName" : firstName,
                            "lastName" : lastName
                        },
                        "dateOfBirth" : dateOfBirth,
                        "entityType" : "Company",
                        "nationality" : "DE",
                        "selectedRecurringDetailReference" : "LATEST"
                    }
                  },(err, response, body) => {
                    if (err) throw err;
                    console.log(response, body);
                })
              }

          })

      })
})

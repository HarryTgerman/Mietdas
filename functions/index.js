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

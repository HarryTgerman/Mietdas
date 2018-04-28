const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const hbs = ('nodemailer-express-handlebars')
const request = require('request');

exports.makeNewRentrequest =  functions.database.ref('app/users/{wildCard}/anfragen/{wildcardMessge}')
.onCreate((snapshot, context) => {
  let sendToMail =snapshot.val().ArtikelOwnerEmail
  let name = snapshot.val().name;
  let article = snapshot.val().cardHeading;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;


  const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'support@mietdas.de',
            pass: '.>?-C4Ry.c:tqQ2Q'
        }
    })
    transporter.use('compile',hbs({
      viewPath: './emailTemplate',
      extName: '.hbs'
    }))

    const mailOptions = {
      from: 'NoReply@MietDas <support@mietdas.de>', // sender address
      to: sendToMail, // list of receivers
      subject: 'Sie haben eine neue Anfrage',
      template: 'index',
      context: {
        name: name,
        article: article,
        von: von,
        bis: bis,
      }
      };

    return transporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
           console.log(info);
      });

})






exports.AdyenEntcrypt =  () => {
  // Set the headers
  let headers = {
      "ws@Company.MietDas":"2BK!+FIi>N3(uXt[2yCZ@4~s8",
      "Content-Type": "application/json"
  }

  // Configure the request
  let options = {
      url: 'https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise',
      method: 'POST',
      headers: headers,
      form: {
          "additionalData": {
              'card.encrypted.json' :"adyenjs_0_1_4p1$..."
          },

          'amount' : {
              'value' : 10000,
              'currency' : "EUR"
          },

          'reference' : "Your Reference Here",
          'merchantAccount' : "TestMerchant"
      }
  }

     request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          // Print out the response body
          console.log(body)
      }
  })


}

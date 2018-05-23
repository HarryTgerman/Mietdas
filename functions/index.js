const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const hbs = require('nodemailer-express-handlebars')
const rp = require('request-promise')


// exports.checkRecaptcha = functions.https.onRequest((req, res) => {
//     const response = req.query
//     console.log(req.query);
//     console.log("recaptcha response", response)
//     rp({
//         uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
//         method: 'POST',
//         formData: {
//             secret: '6LeEWlYUAAAAAPW3leTdfXbBJg7vZ23l6k1gllUP',
//             response: response
//         },
//         json: true
//     }).then(result => {
//         console.log("recaptcha result", result)
//         if (result.success) {
//             res.send("You're good to go, human.")
//         }
//         else {
//             res.send("Recaptcha verification failed. Are you a robot?")
//         }
//     }).catch(reason => {
//         console.log("Recaptcha request failure", reason)
//         res.send("Recaptcha request failed.")
//     })
// })
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://mietdas.de');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

exports.captcha = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }else{
      console.log("bin hier");
      // Secret Key
      const secretKey = '6LeEWlYUAAAAAPW3leTdfXbBJg7vZ23l6k1gllUP';

      // Verify URL
      const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

      request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);


        if(body.success !== undefined && !body.success){
          return res.json({"success": false, "msg":"Failed captcha verification"});
        }

        return res.json({"success": true, "msg":"Captcha passed"});
      });
    }
});


exports.makeNewRentrequest =  functions.database.ref('app/users/{wildCard}/anfragen/{wildcardMessge}')
.onCreate((snapshot, context) => {
  let sendToMail =snapshot.val().ArtikelOwnerEmail
  let name = snapshot.val().name;
  let article = snapshot.val().cardHeading;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;


  const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {xoauth2: xoauth2.createXOAuth2Generator({
            user: 'support@mietdas.de',
            clientId: '153684144787-i6lneuuequuf6ob4o82956ior38svklu.apps.googleusercontent.com',
            clientSecret: 'rAGQ0V5zQAol8IvaGC1iahqd',
            refreshToken: '1/eylspJXcm3Yfr7NxBjOrKmL9BNfJUWYGgogZ_Us5X_s',
            })
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

exports.deletMitteilung =  functions.database.ref('app/users/{wildCard}/mitteilung/{wildcardMessge}')
.onDelete((snapshot, context) => {
  let sendToMail =snapshot.val().anfrage.email
  let article = snapshot.val().anfrage.cardHeading;
  let von = snapshot.val().anfrage.mietbeginn;
  let bis = snapshot.val().anfrage.mietende;


  const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {xoauth2: xoauth2.createXOAuth2Generator({
            user: 'support@mietdas.de',
            clientId: '153684144787-i6lneuuequuf6ob4o82956ior38svklu.apps.googleusercontent.com',
            clientSecret: 'rAGQ0V5zQAol8IvaGC1iahqd',
            refreshToken: '1/eylspJXcm3Yfr7NxBjOrKmL9BNfJUWYGgogZ_Us5X_s',
            })
        }
    })
    transporter.use('compile',hbs({
      viewPath: './emailTemplate',
      extName: '.hbs'
    }))

    const mailOptions = {
      from: 'NoReply@MietDas <support@mietdas.de>', // sender address
      to: sendToMail, // list of receivers
      subject: 'Ihre Anfrage für ' +article+ ' wurde leieder abgelehnt',
      template: 'mitteilung',
      context: {
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

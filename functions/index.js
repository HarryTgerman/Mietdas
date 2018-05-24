const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const hbs = require('nodemailer-express-handlebars')
const rp = require('request-promise')





exports.makeNewRentrequest =  functions.database.ref('app/users/{wildCard}/anfragen/{wildcardMessge}')
.onCreate((snapshot, context) => {
  let sendToMail =snapshot.val().ArtikelOwnerEmail
  let name = snapshot.val().name;
  let article = snapshot.val().cardHeading;
  let von = snapshot.val().mietbeginn;
  let bis = snapshot.val().mietende;


var transporter = nodemailer.createTransport('SMTP', {
    host: 'salfa3210.alfahosting-server.de',
    port: 465,
    auth: {
      user: 'Mietdas.de',
      pass: 'QnWExEpbVab!q.v'
    }
});

  // const transporter = nodemailer.createTransport({
  //    service: 'gmail',
  //    auth: {xoauth2: xoauth2.createXOAuth2Generator({
  //           user: 'support@mietdas.de',
  //           clientId: '153684144787-i6lneuuequuf6ob4o82956ior38svklu.apps.googleusercontent.com',
  //           clientSecret: 'rAGQ0V5zQAol8IvaGC1iahqd',
  //           refreshToken: '1/eylspJXcm3Yfr7NxBjOrKmL9BNfJUWYGgogZ_Us5X_s',
  //           })
  //       }
  //   })
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

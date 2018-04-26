const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')


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

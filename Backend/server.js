const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));


app.post('/subscribe', (req, res) => {

  console.log('hallo ....');

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
});



app.post('/payment', (req,res) => {

<<<<<<< HEAD
  console.log(req);
  let config = {
  
  headers: {
  "Content-Type": "application/json"
},auth: {
      username: "ws@Company.MietDas",
      password: "2BK!+FIi>N3(uXt[2yCZ@4~s8"
=======
  console.log('hallo ....', req);

 let config = {
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-type':'application/json'
  },
  auth: {
      username: "ws@Company.MietDas",
      password: "wzqbjgtdu3fK"
>>>>>>> fc803903fb976031cae837ec342150ff4755c3d4
  }
}


  let data = {
      "additionalData": {
        "card.encrypted.json": req.body.encryptedInstance
            },

      "amount" : {
          "value" : 10000,
          "currency" : "EUR"
      },

      "reference" : "test Überweisung",
      "merchantAccount" : "MietDasCOM"
  }

  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config).then((res)=>{console.log('Das ist die Response', res);}, (err)=>{console.log('Das ist der Error', err);})

});

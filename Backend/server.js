const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
import axios from 'axios'

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));


app.post('/subscribe', (req, res) => {

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

  console.log(req);
  let config = {
  authorization: {
    "ws@Company.MietDas":"2BK!+FIi>N3(uXt[2yCZ@4~s8",
  },
  headers: {
  "Content-Type": "application/json"
  }
  }

  let data = {
      "additionalData": {
          "card.encrypted.json":cseInstance,
      },

      "amount" : {
          "value" : 10000,
          "currency" : "EUR"
      },

      "reference" : "Your Reference Here",
      "merchantAccount" : "TestMerchant"
  }

  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config).then((res)=>{console.log(res, 'Das ist die Response');}, (err)=>{console.log(err, 'Das ist der Error');})

});

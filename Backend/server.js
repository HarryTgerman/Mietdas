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


  var cardData = {
        number : '2223 0000 4841 0010',
        cvc : '737',
        holderName : 'Harry Trippel',
        expiryMonth : '10',
        expiryYear : '2020',
        generationtime : '2018-05-05T08:48:29.292+02:00'
                          // 2017-07-17T13:42:40.428+01:00
    };

  let data = {
      "additionalData": {
        "card.encrypted.json":cseInstance.encrypt(cardData),
      },

      "amount" : {
          "value" : 10000,
          "currency" : "EUR"
      },

      "reference" : "Your Reference Here",
      "merchantAccount" : "MietDasCOM"
  }

  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config).then((res)=>{console.log(res, 'Das ist die Response');}, (err)=>{console.log(err, 'Das ist der Error');})

});

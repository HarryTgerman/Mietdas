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

  console.log('hallo ....', req);

 let config = {
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-type':'application/json'
  },
  auth: {
      username: "ws@Company.MietDas",
      password: "wzqbjgtdu3fK"
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

  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config)
  .then((res)=>{console.log('Das ist die Response');}, (err)=>{console.log('Das ist der Error');})

  //requestPaymentMethods();
  signatureCalculation();
});

requestPaymentMethods = () => {
  let config = {
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-type':'application/json'
   }
 }

 let data = {
      'countryCode' : 'DE',
      'currencyCode' : 'EUR',
      'merchantAccount' : 'MietDasCOM',
      'merchantReference': 'Test_directory_lookup',
      'paymentAmount': 2000,
      'sessionValidity' : '2017-12-25T10%3A31%3A06Z',
      'skinCode': 'sH9qpMyS',
      'merchantSig': '94AwPXSxs0ECicXi1UDdKEmdzHQ6rf7EF9CC%2FzUO5Tg%3D'
  }
  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config)
  .then((res)=>{console.log('Das ist die Response', res);}, (err)=>{console.log('Das ist der Error', err);})

}

signatureCalculation = () => {

  HMAC_KEY = "44782DEF547AAA06C910C43932B1EB0C71FC68D9D0C057550C48EC2ACF6BA056"

  let masterList = [
    { key :'shopperLocale', val: 'en_GB'},
    { key :'merchantReference', val: 'paymentTest:143522\\64\\39255'},
    { key :'merchantAccount', val: 'MietDasCOM'},
    { key :'sessionValidity', val: '2018-07-25T10:31:06Z'},
    { key :'shipBeforeDate', val: '2018-07-30'},
    { key :'paymentAmount', val: '1995'},
    { key :'currencyCode', val: 'EUR'},
    { key :'skinCode', val: 'X7hsNDWp'}
  ]

  masterList = masterList.sort(function (a, b) {
    return a.key.localeCompare( b.key );
  });

  console.log('masterList:',masterList);

  //Erstellung von string aus der masterList

  let i;
  let j;
  let signingString = "";

  for (i = 0; i < masterList.length; i++) {
      signingString += masterList[i].key + ":";
  }

  for (j = 0; j < masterList.length; j++) {
      signingString += masterList[j].val + ":";
  }
  console.log('signing String:',signingString);

  //binäre Konvertierung

  let binary_hmac = Buffer.from(HMAC_KEY, "hex");

  console.log(binary_hmac);


}

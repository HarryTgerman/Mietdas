const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios')
const hexToBinary = require('hex-to-binary');
const sha256 = require('sha256');
const base64js = require('base64-js');
const urlencode = require('urlencode');

const app = express();

let merchantSig = "";


signatureCalculation = () => {

  HMAC_KEY = "081558DC84C7011F068288C3D2F94AB30623A17D67262F6122BA7AA84FF784E0"

  let masterList = [
    { key :'shopperLocale', val: 'de_GER'},
    { key :'merchantReference', val: 'paymentTest'},
    { key :'merchantAccount', val: 'MietDasCOM'},
    { key :'sessionValidity', val: '2018-05-08T14:50:06Z'},
    { key :'shipBeforeDate', val: '2018-07-30'},
    { key :'paymentAmount', val: '1995'},
    { key :'currencyCode', val: 'EUR'},
    { key :'skinCode', val: 'mLIn3bJn'}
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

  let binary_hmacKey = hexToBinary(HMAC_KEY);

  //Calculate the HMAC with the signing string with scha256

  let binary_hmac = sha256(binary_hmacKey, signingString);

  //encode base64

  let signature = base64js.fromByteArray(binary_hmac);

  console.log(signature);

  merchantSig = urlencode(signature);

  //requestPaymentMethods(merchantSig);



  axios.post('https://ca-test.adyen.com/ca/ca/skin/checkhmac.shtml'+ '?' + merchantSig)
  .then((res)=>{console.log('Das ist die Response', res);}, (err)=>{console.log('Das ist der Error', err);})


}



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

  /*
  axios.post('https://pal-test.adyen.com/pal/servlet/Payment/v30/authorise', data, config)
  .then((res)=>{console.log('');}, (err)=>{console.log('');})
*/
  signatureCalculation();


});

requestPaymentMethods = (val) => {

  let merchantSig = val;
  console.log('hier merchantSig',merchantSig);

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
      'sessionValidity' : '2018-05-08T15:50:06Z',
      'skinCode': 'mLIn3bJn',
      'merchantSig': merchantSig
  }
  axios.post('https://test.adyen.com/hpp/directory.shtml', config)
  .then((res)=>{console.log('Das sind die Payment Methods', res);}, (err)=>{console.log('Das ist der Error von Payment Methods', err);})

}

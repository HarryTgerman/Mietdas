const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios')
const hexToBinary = require('hex-to-binary');
const urlencode = require('urlencode');
const crypto = require('crypto')

// const SHA256 = require("crypto-js/sha256");
// let binary_hmacKey = hexToBinary(HMAC_KEY);

const sha256 = require('js-sha256');



const app = express();



// signatureCalculation = () => {
//
//   let HMAC_KEY = "5372E894790F9649C61300743CA2ECE9E9763F9401A9BE53C2B914DE1AE44F07"
//
//   let masterList = [
//     { key :'shopperLocale', val: 'en_GB'},
//     { key :'merchantReference', val: 'paymentTest'},
//     { key :'merchantAccount', val: 'MietDasCOM'},
//     { key :'sessionValidity', val: '2018-05-18T13\:15\:30Z'},
//     { key :'shipBeforeDate', val: '2018-07-30'},
//     { key :'paymentAmount', val: '1995'},
//     { key :'currencyCode', val: 'EUR'},
//     { key :'skinCode', val: 'mLIn3bJn'}
//   ]
//
//   masterList = masterList.sort(function (a, b) {
//     return a.key.localeCompare( b.key );
//   });
//
//   console.log('masterList:',masterList);
//
//   //Erstellung von string aus der masterList
//
//   let i;
//   let j;
//   let signingString = "";
//   for (i = 0; i < masterList.length; i++) {
//       signingString += masterList[i].key + ":";
//   }
//
//   for (j = 0; j < masterList.length; j++) {
//       signingString += masterList[j].val + ":";
//   }
//   signingString  = signingString.slice(0,-1)
//   console.log('signing String:',signingString);
//
//   //binäre Konvertierung
//   (function(){
//       var ConvertBase = function (num) {
//           return {
//               from : function (baseFrom) {
//                   return {
//                       to : function (baseTo) {
//                           return parseInt(num, baseFrom).toString(baseTo);
//                       }
//                   };
//               }
//           };
//       };
//       // hexadecimal to binary
//       ConvertBase.hex2bin = function (num) {
//           return ConvertBase(num).from(16).to(2);
//       };
//       this.ConvertBase = ConvertBase;
//   })(this);
//
//
//   let  binary_hmacKey = ConvertBase.hex2bin(HMAC_KEY)
//
//
//   console.log(binary_hmacKey);
//
//   //Calculate the HMAC with the signing string with scha256
//   // let binary_hmac = crypto.createHmac('sha256',  binary_hmacKey).update(signingString).digest('hex')
//   // let binary_hmac = SHA256(signingString, binary_hmacKey);
//
//   let binary_hmac = sha256.hmac(binary_hmacKey, signingString);
//
//
//    // let binary_hmac= sha256(bin, signingString);
//
//   console.log(binary_hmac);
//
//   //encode base64
//
//   let signature = base64.encode(binary_hmac);
//
//   // let signature = base64js.fromByteArray(binary_hmac);
//
//   console.log(signature);
//
//    let merchantSig = urlencode('t4B8VJfCeSdqOJ3iFqBurwDr6w+udG0taTadG9/sZ8M=');
//
//    console.log(merchantSig);
//
//   //requestPaymentMethods(merchantSig);
//   let config = {
//    headers: {
//      'Accept': 'application/json, text/plain, */*',
//      'Content-type':'application/json'
//    },
//    auth: {
//        merchantAccount: "MietDasCOM",
//        account: "admin",
//        password: "G8$g$!CyB3<uB#?A"
//    }
//  }
//
//  let data = {
//    shopperLocale: 'de_GER',
//     merchantReference: 'paymentTest',
//     merchantAccount: 'MietDasCOM',
//     sessionValidity: '2018-05-15T21\\:46\\:19Z',
//     paymentAmount: '1995',
//     currencyCode: 'EUR',
//     skinCode: 'mLIn3bJn',
//    merchantSig: merchantSig
//  }
//   // curl https://test.adyen.com/hpp/directory.shtml \
//   // -d countryCode=DE \
//   // -d currencyCode=EUR \
//   // -d merchantAccount=MietDasCOM \
//   // -d merchantReference=paymentTest \
//   // -d paymentAmount=2000 \
//   // -d sessionValidity='2018-05-17T22\\:46\\:19Z' \
//   // -d skinCode=mLIn3bJn \
//   // -d merchantSig=t4B8VJfCeSdqOJ3iFqBurwDr6w%2BudG0taTadG9%2FsZ8M%3D
//
//
// // plain)=2000EURpaymentTestmLIn3bJnMietDasCOM2018-05-17T22\\:46\\:19Z, calculated signature=t4B8VJfCeSdqOJ3iFqBurwDr6w+udG0taTadG9/sZ8M= (with orderData=t4B8VJfCeSdqOJ3iFqBurwDr6w+udG0taTadG9/sZ8M=)
//
//
//
// //    axios.post('https://test.adyen.com/hpp/directory.shtml', data)
// //   //
// //    .then((res)=>{console.log('Das ist die Response für PaymentMethod', res);}, (err)=>{console.log('Das ist der Error für PaymentMethods', err);})
// //
// //  let test_url = 'https://ca-test.adyen.com/ca/ca/skin/checkhmac.shtml?'+merchantSig;
// // ;
//  //
//   // axios.post(test_url)
//   // .then((res)=>{console.log('Das ist die Response', res);}, (err)=>{console.log('Das ist der Error', err);})
//  //
//
// }



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));


app.post('/subscribe', (req, res) => {

  console.log('hallo .... subscribe');

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

// requestPaymentMethods = (val) => {
//
//   let merchantSig = val;
//   console.log('hier merchantSig',merchantSig);
//
//   let config = {
//    headers: {
//      'Accept': 'application/json, text/plain, */*',
//      'Content-type':'application/json'
//    }
//  }
//
//
//  let data = {
//       'countryCode' : 'DE',
//       'currencyCode' : 'EUR',
//       'merchantAccount' : 'MietDasCOM',
//       'merchantReference': 'Test_directory_lookup',
//       'paymentAmount': 2000,
//       'sessionValidity' : '2018-05-14T12\\:50\\:06Z',
//       'skinCode': 'mLIn3bJn',
//       'merchantSig': merchantSig
//   }
//   axios.post('https://test.adyen.com/hpp/directory.shtml')
//   .then((res)=>{console.log('Das sind die Payment Methods', res);}, (err)=>{console.log('Das ist der Error von Payment Methods', err);})
//
// }

const express = require('express');

const app = express();
const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));

app.get('/api/payment', (req,res) => {
  console.log(req);
});

handlePayment(){

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

}

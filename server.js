const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/src/App.js');
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});

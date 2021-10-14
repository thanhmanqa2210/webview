'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); 
app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));
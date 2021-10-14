'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser');
  const app = express();
  app.use(bodyParser.json()); 

  app.get('/',(req,res)=>{
        return res.send('Hello World');
    });
app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));
'use strict';
const express=require('express');
const handle=require('./handlle');
const homeController=require('./homeControllers'),
  bodyParser = require('body-parser');
  const app = express();
  const router=express.Router();
  app.use(bodyParser.json()); 
  router.get('/',homeController.getHomePage);
  router.post('/webhook',homeController.postWebhook);
  router.get('/webhook', homeController.getWebhook);
  app.use('/',router);
  app.listen(process.env.PORT || 8080, () => console.log('webhook is listening'));
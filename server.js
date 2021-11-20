"use strict";
const homeController = require("./backend/controllers/homeController");
// Imports dependencies and set up http server
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
router.get("/", homeController.getHomePage);
router.post("/webhook", homeController.postWebhook);
router.get("/webhook", homeController.getWebhook);
router.get('/',homeController.setupPersistentMenu);
app.use("/", router);
app.listen(process.env.PORT || 8080, () => console.log("webhook is listening"));

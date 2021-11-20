require("dotenv").config();
const WEBVIEW_URL = process.env.WEBVIEW_URL;
const request = require("request");
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
let getStartedButton = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Is this the right picture?",
            subtitle: "Tap a button to answer.",
            image_url: "https://bom.to/9PKlBc",
            buttons: [
              {
                type: "postback",
                title: "Yes!",
                payload: "yes",
              },
              {
                type: "web_url",
                url: "https://app-demo-webview.herokuapp.com/",
                title: "View Website",
                messenger_extensions: "false",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
module.exports = {
  callSendAPI,
  getStartedButton,
};

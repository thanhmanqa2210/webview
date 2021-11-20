require("dotenv").config();
const WEBVIEW_URL=process.env.WEBVIEW_URL;
const request = require("request");
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid,
    },
    "message": response,
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
            title: "Welcome to Chatbot!",
            image_url:
              "https://lh3.googleusercontent.com/proxy/z5eiJPRzZekCHoyCqfu9_6Yo9EuaG083hN-cY-l7RHiDN8tO63gee5GsVIQDamTAESoUo6JS1EIOw3ivdnglXNKc1L_OtLbDFUaAtULTgNhoKUpIJs2l8ELG-edO5J7fAe97-Rk9bgukhpclHXFfWhCBosN5kBANe_ITilg",
            subtitle:
              "Online and mobile platform that connects local jobs or needs with freelancers quickly and conveniently, helping consumers find immediate help with daily tasks including cleaning. clean, move, repair and teach.",
            default_action: {
              type: "web_url",
              url: `${WEBVIEW_URL}`,
              messenger_extensions: true,
              webview_height_ratio: "full",
            },
            buttons: [
              {
                type: "web_url",
                url: `${WEBVIEW_URL}`,
                title: "Start order",
                messenger_extensions: false,
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
  getStartedButton
};

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
            title: "Welcome to Taskdino Chatbot!",
            image_url:
              "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/245123950_114673120973061_8979926310271068735_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=e3f864&_nc_ohc=RKT401o9hpAAX9hUrj0&_nc_ht=scontent.fsgn5-10.fna&oh=f0b4eb3a1d3a2f10ca6ed8be56f7939e&oe=619E956C",
            subtitle:
              "Online and mobile platform that connects local jobs or needs with freelancers quickly and conveniently, helping consumers find immediate help with daily tasks including cleaning. clean, move, repair and teach.",
            default_action: {
              type: "web_url",
              url: WEBVIEW_URL,
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

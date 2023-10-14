const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "info@ultrahearing.ca",
    pass: "x3Lbv2p83nSq",
  },
});

const adminEmail = "info@ultrahearing.ca";

exports.contactUltraHearing = onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS' || request.method === 'GET') {
    response.end();
  }
  else {
    const body = request.body;

    var resToSend = {};
    if (body) {
      let emailOptions = {}
      if (body.date != undefined && body.date != "") {
        emailOptions = bookAppointment(body)
      } else {
        emailOptions = contactMe(body)
      }

      const info = transporter.sendMail(emailOptions);

      console.log("Message sent: %s", info.messageId);
    }
    response.send(JSON.stringify(resToSend));
  }
  //   response.send("Hello from Firebase!");
});

function bookAppointment(body) {
  let emailOptions = {};
  emailOptions.to = body.email;
  emailOptions.from = adminEmail;
  emailOptions.bcc = adminEmail;
  emailOptions.subject = "Request for appointment at Ultra Hearing on " + body.date;
  emailOptions.html = "Hello " + body.name + "<br><br>" + 
  "Thank you for choosing Ultra Hearing Clinic <br><br>" + 
  "Request Details: <br> Appointment date : " + body.date + "<br> Contact No : " + body.phone + "Message: " + body.message + "<br><br>" +
  "We will connect with you shortly to confirm appointment. <br><br> Regards, <br> Ultra Hearing Clinic";

  return emailOptions;
}

function contactMe(body) {
  let emailOptions = {};
  emailOptions.to = body.email;
  emailOptions.from = adminEmail;
  emailOptions.bcc = adminEmail;
  emailOptions.subject = body.name + " - " + body.subject;
  emailOptions.html = body.message;

  return emailOptions;
}
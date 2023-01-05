const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
module.exports = async (to, from, subject, text) => {
  sgMail.setApiKey(process.env.API_KEY);
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
  };
  sgMail
    .send(msg)
    .then((msg) => {
      console.log(msg);
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

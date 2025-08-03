const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "akshaychavan00981@gmail.com",
    pass: "bewdwxtumybjpqpl", // don't include spaces!
  },
});

module.exports = transporter;

const transporter = require("./Email.config.js");

const sendVerificationcode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Apna_medical" <akshaychavan00981@gmail.com>',
      to: email,
      subject: "Verify Email ✔",
      text: "Verify your email",
      html: `<b>Your verification code is: ${verificationCode}</b>`,
    });

    console.log("Email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error;
  }
};

module.exports = { sendVerificationcode };

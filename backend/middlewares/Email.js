const transporter = require("./Email.config.js");

const sendVerificationcode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Apna Medical" <akshaychavan00981@gmail.com>',
      to: email,
      subject: "Your One-Time Password (OTP) - Apna Medical",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <div style="background-color: #00796b; padding: 20px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Apna Medical</h1>
              <p style="color: #c8e6c9; margin-top: 5px;">Secure Login Verification</p>
            </div>
            
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">
                Dear User,
              </p>
              <p style="font-size: 15px; color: #333333; line-height: 1.5;">
                You requested a one-time password (OTP) to verify your login. Please use the code below to complete the process:
              </p>

              <div style="margin: 30px 0; text-align: center;">
                <span style="display: inline-block; background-color: #e0f2f1; color: #004d40; font-size: 32px; font-weight: bold; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
                  ${verificationCode}
                </span>
              </div>

              <p style="font-size: 14px; color: #888888; text-align: center;">
                This code will expire in <strong>60 seconds</strong>. Do not share it with anyone.
              </p>
            </div>

            <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
              <p style="font-size: 13px; color: #888888; margin: 0;">
                Didn’t request this? Please ignore this email.
              </p>
              <p style="font-size: 13px; color: #888888; margin-top: 5px;">
                &copy; ${new Date().getFullYear()} Apna Medical. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error;
  }
};

module.exports = { sendVerificationcode };

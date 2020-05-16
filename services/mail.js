var nodemailer = require("nodemailer");

const sendMail = async (toEmail, subject, html) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      SMTPAuth: true,
      SMTPSecure: "tls",
      auth: {
        user: "hsv70nam@gmail.com",
        pass: "hsv70nam@123"
      }
    });
    var mailOptions = {
      from: "hsv70name@gmail.com",
      to: toEmail,
      subject,
      html
    };

    let info = await transporter.sendMail(mailOptions);
    if (info) {
      return {
        success: true,
        payload: info
      };
    }
  } catch (err) {
    console.log("error send mail: ", err);
    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = {
  sendMail
};

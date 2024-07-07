const nodemailer = require("nodemailer");

exports.sendMail = async (receiver, subject, textBody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.SERVER_PORT,
      secureConnection: true,
      auth: {
        user: process.env.SERVER_USERNAME,
        pass: process.env.SERVER_PASSWORD,
      },
    });
    const message = {
      from: process.env.SERVER_MAIL,
      to:process.env.ADMIN_EMAIL,
      //to : 'amira@workpoint.tn',
      subject: subject,
      text: `
              
              ${textBody}
              
              `,
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

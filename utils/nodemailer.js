import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
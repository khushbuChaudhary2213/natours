const { convert } = require('html-to-text');
const nodemailer = require('nodemailer');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const BaseEmail = require('../views/BaseEmail');

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Khushbu Chaudhary <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // sendgrid
      return nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey', // literally the word "apikey"
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(component, subject) {
    // 1) Render React email → HTML

    // console.log(subject);
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(component, {
        subject,
        firstName: this.firstName,
        url: this.url,
      }),
    );

    console.log('Using API key:', process.env.SENDGRID_API_KEY ? 'YES' : 'NO');
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject:
        subject === 'passwordReset'
          ? 'Your password reset token (valid for only 10 minutes)'
          : subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(BaseEmail, 'welcome');
  }

  async sendPasswordReset() {
    await this.send(BaseEmail, 'passwordReset');
  }
};

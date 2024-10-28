"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
var transporter = nodemailer_1.default.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP host
    port: 587, // Replace with your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
    },
});
var mailOptions = {
    from: 'your-email@example.com', // Replace with your email
    to: 'recipient@example.com', // Replace with the recipient's email
    subject: 'Test Email',
    text: 'Hello, this is a test email!',
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log('Error sending email:', error);
    }
    console.log('Message sent: %s', info.messageId);
});

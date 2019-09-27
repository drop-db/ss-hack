const nodemailer = require('nodemailer');
const { gmail, env } = require('../config/vars');

const gmailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: gmail,
});

exports.sendEmail = async function sendEmail(to, subject, html) {
    if (env === 'test') return;
    await gmailTransport.sendMail({
        from: gmail.user,
        to,
        subject,
        html,
    });
};

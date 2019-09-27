const { sendEmail } = require('../../externalServices/mailing');
const { CONFIRM_USER } = require('../../const/WEB_CLIENT_URLS');

const CONFIRM_MAIL_SUBJECT = 'Confirm your email for Short Klips account';

function sendConfirmEmail(confirmToken, to) {
    const confirmUrl = `${CONFIRM_USER}/${confirmToken.token}`;
    const mailConfirmHTML = `<p>To confirm account click on <a href="${confirmUrl}">${confirmUrl}</a></p>`;
    return sendEmail(to, CONFIRM_MAIL_SUBJECT, mailConfirmHTML);
}

exports.sendConfirmEmail = sendConfirmEmail;

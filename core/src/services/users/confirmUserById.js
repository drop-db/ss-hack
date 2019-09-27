const User = require('../../models/user.model');
const UserToken = require('../../models/userToken.model');
const withTransaction = require('../../utils/withTransaction');
const { CLIENT_LOGIN } = require('../../const/WEB_CLIENT_URLS');
const { sendEmail } = require('../../externalServices/mailing');

const EDITOR_MAIL_SUBJECT = 'Your editor Short Klips account confirmed';
const EDITOR_MAIL_TEXT = `<p>Use this link <a href="${CLIENT_LOGIN}">${CLIENT_LOGIN}</a> to login!</p>`;

async function confirmUserById(userId, session) {
    const user = await User.findById(userId).session(session);
    user.isConfirmed = true;
    const sendConfirmEmail = user.role === User.USER_ROLES.EDITOR
        ? sendEmail(user.email, EDITOR_MAIL_SUBJECT, EDITOR_MAIL_TEXT)
        : null;
    await Promise.all([
        UserToken.deleteMany({
            user,
            tokenType: UserToken.TOKEN_TYPES.CONFIRM,
        }, { session }),
        user.save(),
        sendConfirmEmail,
    ]);
}

exports.confirmUserById = confirmUserById;
exports.confirmUserByIdWT = withTransaction(confirmUserById);

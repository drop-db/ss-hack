const UserModel = require('../../models/user.model');
const UserEditorModel = require('../../models/userEditor.model');

async function setExistForProperty(res, model, where, property) {
    const existingUser = await model.findOne(where);
    res[property] = Boolean(existingUser);
}

module.exports = async function userExists(email, phone) {
    const res = {};
    if (email) {
        await setExistForProperty(res, UserModel, { email: email.toLowerCase() }, 'emailExists');
    }

    if (phone) {
        await setExistForProperty(res, UserEditorModel, { phone }, 'phoneExists');
    }

    return res;
};

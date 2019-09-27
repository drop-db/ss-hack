const User = require('../../models/user.model');
const withTransaction = require('../../utils/withTransaction');

async function updateUser(userId, data, session) {
    const {
        firstName,
        lastName,
        timezone,
        experience,
        phone,
        bio,
    } = data;
    const isUserChanged = firstName || lastName;
    const isEditorChanged = timezone || experience || phone || bio;
    if (!isUserChanged && !isEditorChanged) return null;

    const user = await User.findById(userId).populate('editor').session(session);
    const { editor } = user;
    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }

    const promises = [isUserChanged && user.save()];
    if (!editor || !isEditorChanged) return Promise.all(promises);

    if (timezone) {
        editor.timezone = timezone;
    }
    if (experience) {
        editor.experience = experience;
    }
    if (phone) {
        editor.phone = phone;
    }
    if (bio) {
        editor.bio = bio;
    }

    promises.push(editor.save());
    return Promise.all(promises);
}

exports.updateUser = updateUser;
exports.updateUserWT = withTransaction(updateUser);

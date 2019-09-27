const User = require('../../models/user.model');

async function getById(userId) {
    const user = await User.findById(userId).populate({
        path: 'editor',
        populate: [{
            path: 'projectTypes',

        }, {
            path: 'portfolio',
            populate: [{
                path: 'video',
                populate: [{
                    path: 'fileVersions',
                }],
            }],
        }],
    });
    const userDto = user.toDto();
    return { user: userDto };
}

exports.getById = getById;

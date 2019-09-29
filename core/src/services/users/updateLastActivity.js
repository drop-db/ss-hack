const User = require('../../models/user.model');
const withTransaction = require('../../utils/withTransaction');

async function updateLastActivity(clickedUserId, userId, session) {
    const user = await User.findById(userId).session(session);
    user.lastActivity = new Date();
    const clickerUser = await User.findById(clickedUserId).session(session);
    clickerUser.lastActivityClicks.push({
        clickedAt: new Date(),
        user,
    });
    await clickerUser.save();
    await user.save();
}

exports.updateLastActivity = updateLastActivity;
exports.updateLastActivityWT = withTransaction(updateLastActivity);

const User = require('../../models/user.model');

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;
const DEFAULT_ROLE = {
    $ne: User.USER_ROLES.ADMIN,
};

async function getList({
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
    role = DEFAULT_ROLE,
    confirmed,
}) {
    const where = {
        role,
    };
    if (confirmed === true || confirmed === false) {
        where.isConfirmed = confirmed;
    }
    const users = await User.paginate(where, {
        page,
        limit: perPage,
        sort: {
            _id: -1,
        },
        populate: ['tokens', 'editor'],
    });
    const usersDto = users.docs.map(u => u.toDto({ lastLogin: true, editor: true }));
    return {
        users: usersDto,
        totalUsers: users.totalDocs,
    };
}

exports.getListOfUsers = getList;

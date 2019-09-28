const User = require('../../models/user.model');

const DEFAULT_ROLE = {
    $ne: User.USER_ROLES.ADMIN,
};

async function getList({
    page,
    perPage,
    role = DEFAULT_ROLE,
}) {
    const where = {
        role,
    };
    const users = await (page && perPage ? User.paginate(where, {
        page,
        limit: perPage,
        sort: {
            _id: -1,
        },
    }) : User.find(where));
    const usersDto = (users.docs || users).map(u => u.toDto({ lastLogin: true, editor: true }));
    return {
        users: usersDto,
        totalUsers: users.totalDocs,
    };
}

exports.getListOfUsers = getList;

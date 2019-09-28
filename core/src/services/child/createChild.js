const Child = require('../../models/child.model');
const withTransaction = require('../../utils/withTransaction');

async function createChild(data, session) {
    const {
        firstName,
        lastName,
        sex,
        house,
        birthday,
        about,
    } = data;
    const city = Object.keys(Child.CHILD_HOUSES)
        .find(c => Object.values(Child.CHILD_HOUSES[c]).some(h => h === house));
    const childDocData = {
        firstName,
        lastName,
        sex,
        city,
        birthday,
        about,
        house,
    };
    const [child] = await Child.create([childDocData], { session });
    return child.toDto();
}

exports.createChild = createChild;
exports.createChildWT = withTransaction(createChild);

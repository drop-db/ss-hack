const Child = require('../../models/child.model');
const withTransaction = require('../../utils/withTransaction');

async function getChildList(data, session) {
    const children = await Child.find().session(session);
    return { children: children.map(c => c.toDto()) };
}

exports.getChildList = getChildList;
exports.getChildListWT = withTransaction(getChildList);

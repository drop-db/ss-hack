const mongoose = require('mongoose');

module.exports = function toDto(model, params, nullIfNoDTO, methodName = 'toDto') {
    if (!model || mongoose.Types.ObjectId.isValid(model)) {
        return model;
    }

    if (Array.isArray(model)) {
        return model.map(o => toDto(o, methodName, nullIfNoDTO)).filter(v => v);
    }

    if (model[methodName]) {
        return model[methodName]();
    }

    return nullIfNoDTO || undefined;
};

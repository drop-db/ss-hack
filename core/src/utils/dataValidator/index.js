const DataValidationError = require('../APIErrors/DataValidationError');
const userFound = require('./validators/userFound');
const userNotFound = require('./validators/userNotFound');

class DataValidator {
    constructor() {
        this.validators = [];
    }

    validateUserFound(where, error) {
        return this.addValidator(userFound, {where, error});
    }

    validateUserNotFound(where, error) {
        return this.addValidator(userNotFound, {where, error});
    }


    async validate() {
        const validators = this.validators.map(v => v.validator(v.data));
        const errors = await Promise.all(validators);
        const notEmptyErrors = errors.filter(e => e);
        if (notEmptyErrors.length) throw new DataValidationError(notEmptyErrors);
        return this;
    }

    addValidator(validator, data) {
        this.validators.push({validator, data});
        return this;
    }
}

module.exports = () => new DataValidator();


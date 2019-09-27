const DataValidationError = require('../APIErrors/DataValidationError');
const tokenNotValid = require('./validators/tokenNotValid');
const userIdNotFound = require('./validators/userNotFound');

class DataValidator {
    constructor() {
        this.validators = [];
    }

    validateUserIdNotFound(where) {
        return this.addValidator(userIdNotFound, where);
    }

    validateTokenNotValid(where, checkExpired) {
        return this.addValidator(tokenNotValid, {where, checkExpired});
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


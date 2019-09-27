const multiparty = require('multiparty');

const { MAX_FILE_SIZE_BYTES } = require('../const/files/FILE_PROPS');
const { TMP_STORAGE_FOLDER } = require('../utils/storagePaths');

const Form = () => new multiparty.Form({
    uploadDir: TMP_STORAGE_FOLDER,
    maxFilesSize: MAX_FILE_SIZE_BYTES,
});

function formArraysToBody(values, toOne) {
    const fieldsObject = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(values).forEach(k =>
        (values[k].length === 1 && toOne
            ? [fieldsObject[k]] = values[k]
            : fieldsObject[k] = values[k]));
    return fieldsObject;
}

module.exports = function getParser({ toBody = true, toOne = false } = {}) {
    return (req, res, next) => {
        try {
            Form().parse(req, (err, fields, files) => {
                if (err) return next(err);
                req.formFields = fields;
                req.files = files;
                if (toBody) {
                    req.body = {
                        ...req.body,
                        ...formArraysToBody(fields, toOne),
                        ...formArraysToBody(files, toOne),
                    };
                }
                return next();
            });
        } catch (e) {
            next(e);
        }
    };
};

const path = require('path');
const { baseStoragePath, rootStorageUrl } = require('../config/vars');
const generateRandomString = require('./generateRandomString');

const TMP_FOLDER_NAME = 'tmp';

const TMP_STORAGE_FOLDER = path.join(baseStoragePath, TMP_FOLDER_NAME);

module.exports = {
    TMP_FOLDER_NAME,
    TMP_STORAGE_FOLDER,
};

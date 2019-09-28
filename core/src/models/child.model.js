const mongoose = require('mongoose');
const _ = require('lodash');

const CHILD_HOUSES = require('../const/CHILD_HOUSES');
const CITIES = require('../const/CITIES');

const CHILD_HOUSES_ARRAY = _.flatMap(Object.values(CHILD_HOUSES), h => Object.values(h));
const CITIES_ARRAY = Object.values(CITIES);

const childSchema = new mongoose.Schema({
    firstName: {
        trim: true,
        required: true,
        type: String,
    },
    lastName: {
        trim: true,
        required: true,
        type: String,
    },
    birthday: {
        type: Date,
        required: true,
    },
    about: {
        trim: true,
        type: String,
    },
    city: {
        type: String,
        enum: CITIES_ARRAY,
    },
    house: {
        type: String,
        enum: CHILD_HOUSES_ARRAY,
    },
    sex: {
        type: Boolean,
        enum: CHILD_HOUSES_ARRAY,
    },
}, {
    versionKey: false,
    timestamps: true,
});

childSchema.methods.toDto = function toDto(options = {}) {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        house: this.house,
        city: this.city,
        about: this.about,
        sex: this.sex,
    };
};

childSchema.statics = {
    CHILD_HOUSES,
    CHILD_HOUSES_ARRAY,
    CITIES,
    CITIES_ARRAY,
};


module.exports = mongoose.model('Child', childSchema);

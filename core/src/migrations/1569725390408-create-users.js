const _ = require('lodash');
const User = require('../models/user.model');

const faker = require('faker');

faker.locale = 'ru';

const FIRST_NAMES = ['Павел', 'Роман', 'Наталья', ' Ирина', 'Олег', 'Евгений'];
const LAST_NAMES = ['Китов', 'Жуков', 'Костеж', ' Светлакова', 'Сентерева', 'Луговской'];
const SECOND_NAMES = ['Андреевич', 'Павлович', 'Георгьевна', 'Михайловка', 'Владиславович', 'Иванович'];
const LIVING_AREAS = ['Невский район', 'Свердловский район', 'Правобережный район', 'Центральный район', 'Новый район'];
const PROFESSIONS = ['Воспитатель', 'Врач', 'Слесарь', 'Учитель', 'Бухгалтер'];
const POSTS = ['Младший', 'Средний', 'Старший'];
const CITIES = Object.values(require('../const/CITIES'));

const HOBBIES = ['Садоводство', 'Театр', 'Музыка', 'Программирование', 'Общение', 'Прогулки', 'Кино', 'Литература', 'Рисование', ''];
const EXPERIENCES = ['Нет опыта', 'Большой опыт в работе с детьми', 'Хороший опыт в координировании людей', 'Широкий опыт в психологии'];
const EDUCATIONS = ['Среднее образование', 'Высшее образование', 'Не полное среднее'];

const ROLES = [User.USER_ROLES.CURATOR, User.USER_ROLES.MENTOR, User.USER_ROLES.PSYCHOLOGIST];

const USERS_TO_CREATE = 20;
const MAX_HOBBIES = 4;

function randomFromArray(arr) {
    const random = Math.round(Math.random() * (arr.length - 1));
    return arr[random];
}

function randomHobbies() {
    const count = Math.round(Math.random() * MAX_HOBBIES + 1);
    return new Array(count).fill(0).map(() => randomFromArray(HOBBIES));
}

async function up() {
    const usersData = new Array(USERS_TO_CREATE).fill(0).map((v, i) => {
        const g = i % 2 === 0;
        return {
            firstName: faker.name.firstName(g),
            lastName: faker.name.lastName(g),
            secondName: faker.name.suffix(g),
            email: faker.internet.email(g),
            password: '123456',
            role: randomFromArray(ROLES),
            phone: faker.phone.phoneNumber(),
            isMarried: g,
            birthday: faker.date.past(),
            livingArea: faker.address.state(),
            city: randomFromArray(CITIES),
            sendMailing: g,
            profession: randomFromArray(PROFESSIONS),
            isFullTime: !g,
            post: randomFromArray(POSTS),
            hobbies: randomHobbies(),
            experience: randomFromArray(EXPERIENCES),
            education: randomFromArray(EDUCATIONS),
            hasCar: !g,
            hasChild: g,
            sex: !g,
            lastActivity: new Date(),
        };
    });
    await User.create(usersData);
}

async function down() {
}

module.exports = { up, down };

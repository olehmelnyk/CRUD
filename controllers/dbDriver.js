'use strict';

const config = require('../config');

const DB = config.DB_TYPE !== 'MONGODB'
    ? require('./../models/mongoDB/users') // we use MongoDB...
    : require('./../models/jsonFileDB/jsonFileDBAsync'); // use JSON file as DB

DB.getAllUsers.then(users => console.log(users), error => console.log(error));
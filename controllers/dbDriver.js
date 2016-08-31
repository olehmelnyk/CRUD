'use strict';

const config = require('../config');

exports.DB = config.DB_TYPE === 'MONGODB'
    ? require('./../models/mongoDB/users') // we use MongoDB...
    : require('./../models/jsonFileDB/jsonFileDBAsync'); // use JSON file as DB
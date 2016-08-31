'use strict';

/**
 * MongoDB Connection
 */

const config = require('../../config');

const mongoose = require('mongoose');

// mongoDB://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
let mongoConnectionString = 'mongodb://';
if(config.MONGO.DB_USER && config.MONGO.DB_PASS) {
    mongoConnectionString += `${config.MONGO.DB_USER}:${config.MONGO.DB_PASS}@`;
}
mongoConnectionString += `${config.MONGO.DB_HOST}:${config.MONGO.DB_PORT}/${config.MONGO.DB_NAME}`;
if(config.MONGO.DB_OPTIONS){
    mongoConnectionString += config.MONGO.DB_OPTIONS;
}

mongoose.connect(mongoConnectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { /* we are connected */});

module.exports = mongoose;
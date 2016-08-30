'use strict';

/**
 * MongoDB Connetion
 */

const config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.DB_HOST}/${config.DB_NAME}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {/* we are connected */});

module.exports = mongoose;
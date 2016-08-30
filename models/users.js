'use strict';

const mongoose = require('./mongodb');

/**
 * Users MongoDb Schema
 */

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
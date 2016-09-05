'use strict';

const mongoose = require('./mongoDB');
mongoose.Promise = global.Promise;

/**
 * Users MongoDb Schema
 */

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find((error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
};

const getUserByID = id => {
    return new Promise((resolve, reject) => {
        User.find({_id: id}, (error, data) => {
            error ? reject(error) : resolve(data[0]);
        });
    });
};

const addUser = data => {
    return new Promise((resolve, reject) => {
        new User(data).save((error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
};

const editUser = user => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(user.id, user, (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
};

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(id, (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
};

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
'use strict';

const mongoose = require('./mongoDB');
mongoose.Promise = global.Promise;

/**
 * Users MongoDb Schema
 */

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const getAllUsers = new Promise((resolve, reject) => {
    User.find({}, (error, data) => {
        error
            ? reject(error)
            : resolve(data);
    });
});

//test
//getAllUsers.then(data => console.log(data), error => console.log(error));

const getUserByID = id => {
    return new Promise((resolve, reject) => {
        User.find({_id: id}, (error, data) => {
            error
                ? reject(error)
                : resolve(data[0]);
        });
    });
};

//test
//getUserByID('57c5d212e8bd5b7437597490').then(user => console.log(user), error => console.log(error));

const addUser = data => {
    return new Promise((resolve, reject) => {
        new User(data).save((error, data) => {
            error
                ? reject(error)
                : resolve(data)
        });
    });
};

//test
//addUser({firstName: 'John', lastName: 'Doe'}).then(data => console.log(data), error => console.log(error));
//getAllUsers.then(newUser => console.log(newUser), error => console.log(error));

const editUser = user => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(user.id, user, (error, data) => {
            error
                ? reject(error)
                : resolve(user)
        });
    });
};

//editUser('57c687f34a9710c41630aa0c', {firstName: 'John', lastName: 'Smith'}).then(data => console.log(data), error => console.log(error));
//getAllUsers.then(editedUser => console.log(editedUser), error => console.log(error));

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(id, (error, data) => {
            error
                ? reject(error)
                : resolve(data)
        });
    });
};

//deleteUser('57c705512073915c042ef779').then(data => console.log(data), error => console.log(error));
//getAllUsers.then(deletedUser => console.log(deletedUser), error => console.log(error));

//module.exports = User;

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
'use strict';

const mongoose = require('./mongoDB');

/**
 * Users MongoDb Schema
 */

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

exports.getAllUsers = new Promise((resolve, reject) => {
    User.find({}, (error, data) => {
        error
            ? reject(error)
            : resolve(data);
    });
});

//this.getAllUsers.then(data => console.log(data), error => console.log(error));

exports.getUserByID = uid => {
    return new Promise((resolve, reject) => {
        User.find({_id: uid}, (error, data) => {
            error
                ? reject(error)
                : resolve(data);
        });
    });
};

// this.getUserByID('57c5d212e8bd5b7437597490').then(data => console.log(data), error => console.log(error));

exports.addUser = data => {
    const newUser = new User(data);
    return new Promise((resolve, reject) => {
        newUser.save((error, data) => {
            error
                ? reject(error)
                : resolve(data)
        });
    });
};

//this.addUser({firstName: 'Marisa', lastName: 'Mayer'}).then(data => console.log(data), error => console.log(error));
//this.getAllUsers.then(data => console.log(data), error => console.log(error));

exports.editUser = (id, data) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, data, (error, data) => {
            error
                ? reject(error)
                : resolve(data)
        });
    });
};

//this.editUser('57c687f34a9710c41630aa0c', {firstName: 'John', lastName: 'Smith'}).then(data => console.log(data), error => console.log(error));
//this.getAllUsers.then(data => console.log(data), error => console.log(error));

exports.deleteUser = id => {
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(id, (error, data) => {
            error
                ? reject(error)
                : resolve(data)
        });
    });
};

//this.deleteUser('57c687f34a9710c41630aa0c').then(data => console.log(data), error => console.log(error));
//this.getAllUsers.then(data => console.log(data), error => console.log(error));

//module.exports = User;
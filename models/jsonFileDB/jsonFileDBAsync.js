'use strict';

const fs = require('fs');
const path = require('path');

const config = require('../../config');
const dbFile = path.join(config.ROOT_FOLDER, config.JSON_DB_FILE);

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbFile, 'utf8', (error, data) => {
            error
                ? reject(`Can't read file ${dbFile}!\n${error}`)
                : resolve(JSON.parse(data).users);
        });
    });
};

const getUserByID = id => {
  return new Promise((resolve, reject) => {
      getAllUsers().then(
          users => resolve(users.find(user => user.id == id)),
          error => reject(error)
      );
  });
};

// TODO: find better algorithm to generate UID,
// for example, create other db obj with settings,
// and store UID there, increment on each userAdd action
const addUser = data => {
    return new Promise((resolve, reject) => {
        getAllUsers().then(
            users => {
                users.push({
                    id: users.slice(-1)[0].id +1,
                    firstName: data.firstName,
                    lastName: data.lastName
                });
                fs.writeFile(dbFile, JSON.stringify({users: users}), error => error ? reject(error) : resolve(users.slice(-1)[0]));
            },
            error => reject(error) // <- reject from getAllUsers
        )
    })
};

const editUser = data => {
    return new Promise((resolve, reject) => {
        getAllUsers().then(
            users => {
                for(let i = 0; i < users.length; i++){
                    if(users[i].id === +data.id){
                        users[i].firstName = data.firstName;
                        users[i].lastName = data.lastName;
                        break;
                    }
                }
                fs.writeFile(dbFile, JSON.stringify({users: users}), error => error ? reject(error) : resolve(data));
            },
            error => reject(error) // <- reject from getAllUsers
        )
    })
};

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        getAllUsers().then(
            users => {
                for(let i = 0; i < users.length; i++){
                    if(users[i].id === +id){
                        var deletedUser = users.pop();
                        break;
                    }
                }
                fs.writeFile(dbFile, JSON.stringify({users: users}), error => error ? reject(error) : resolve(deletedUser));
            },
            error => reject(error) // <- reject from getAllUsers
        )
    })
};

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
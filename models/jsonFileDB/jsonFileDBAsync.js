'use strict';

const fs = require('fs');
const path = require('path');

const config = require('../../config');
const dbFile = path.join(config.ROOT_FOLDER, config.JSON_DB_FILE);

const getAllUsers = new Promise((resolve, reject) => {
    fs.readFile(dbFile, 'utf8', (error, data) => {
        error
            ? reject(`Can't read file ${dbFile}!\n${error}`)
            : resolve(JSON.parse(data).users);
    });
});

//getAllUsers.then(users => console.log(users), error => console.log(error));

const getUserByID = id => {
  return new Promise((resolve, reject) => {
      getAllUsers.then(
          users => resolve(users.find(user => user.id == id)),
          error => reject(error)
      );
  });
};

//getUserByID(0).then(user => console.log(user), error => console.log(error));

// TODO: find better algorithm to generate UID,
// for example, create other db obj with settings,
// and store UID there, increment on each userAdd action
const addUser = data => {
    return new Promise((resolve, reject) => {
        getAllUsers.then(
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

//addUser({firstName: 'Oleh', lastName: 'Melnyk'}).then(newUser => console.log(newUser), error => console.log(error));

const editUser = data => {
    return new Promise((resolve, reject) => {
        getAllUsers.then(
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

//editUser({id: 5, firstName: 'John', lastName: 'Smith'}).then(editedUser => console.log(editedUser), error => console.log(error));

const deleteUser = id => {
    return new Promise((resolve, reject) => {
        getAllUsers.then(
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

//deleteUser(5).then(deletedUser => console.log(deletedUser), error => console.log(error));

exports.getAllUsers = getAllUsers;
exports.getUserByID = getUserByID;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
'use strict';

const fs = require('fs');
const path = require('path');

const config = require('../../config');
const dbFile = path.join(config.ROOT_FOLDER, config.JSON_DB_FILE);

exports.getAllUsers = new Promise((resolve, reject) => {
    fs.readFile(dbFile, 'utf8', (error, data) => {
        error
            ? reject(`Can't read file ${dbFile}!\n${error}`)
            : resolve(JSON.parse(data).users);
    });
});

// use promise
//this.getAllUsers.then(users => console.log(users), error => console.log(error));

exports.getUserByID = id => {
  return new Promise((resolve, reject) => {
      this.getAllUsers.then(
          users => users.find(user => user.id === id),
          error => error);
  });
};


exports.addUser = data => {
    const users = this.getAllUsers();
    const uid = users.slice(-1)[0].id +1;
    users.push({
        id: uid,
        firstName: data.firstName,
        lastName: data.lastName
    });
    write({users: users});
};

exports.editUser = data => {
    const users = this.getAllUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].id === +data.id){
            users[i].firstName = data.firstName;
            users[i].lastName = data.lastName;
            break;
        }
    }
    write({users: users});
};

exports.deleteUser = uid => {
    const users = this.getAllUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].id === uid){
            users.splice(i, 1);
            break;
        }
    }
    write({users: users});
};
'use strict';

const fs = require('fs');
const path = require('path');

const config = require('../../config');
const dbFile = path.join(config.ROOT_FOLDER, config.JSON_DB_FILE);

// Sync file I/O
const read = JSON.parse(fs.readFileSync(dbFile, 'utf8')).users;
const write = data => fs.writeFileSync(dbFile, JSON.stringify(data));

exports.getAllUsers = read;

exports.getUserByID = uid => this.getAllUsers.find(user => user.id === uid);

exports.addUser = data => {
    const users = this.getAllUsers;
    const uid = users.slice(-1)[0].id +1;
    users.push({
        id: uid,
        firstName: data.firstName,
        lastName: data.lastName
    });
    write({users: users});
};

exports.editUser = (data) => {
    const users = this.getAllUsers;
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
    const users = this.getAllUsers;
    for(let i = 0; i < users.length; i++){
        if(users[i].id === uid){
            users.splice(i, 1);
            break;
        }
    }
    write({users: users});
};
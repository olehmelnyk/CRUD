'use strict';

const fs = require('fs');

const db = './data.json';

exports.read = JSON.parse(fs.readFileSync(db, 'utf8')).users;
exports.write = data => fs.writeFileSync(db, JSON.stringify(data));

exports.getUserByID = uid => this.read.find(user => user.id === uid);

exports.addNewUser = data => {
    let users = this.read;
    let uid = users.slice(-1)[0].id +1;
    users.push({
        id: uid,
        firstName: data.firstName,
        lastName: data.lastName
    });
    this.write({users: users});
};

exports.updateUser = (data) => {
    let users = this.read;
    for(let i = 0; i < users.length; i++){
        if(users[i].id === +data.id){
            users[i].firstName = data.firstName;
            users[i].lastName = data.lastName;
            break;
        }
    }
    this.write({users: users});
};

exports.deleteUser = uid => {
    let users = this.read;
    for(let i = 0; i < users.length; i++){
        if(users[i].id === uid){
            users.splice(i, 1);
            break;
        }
    }
    this.write({users: users});
};
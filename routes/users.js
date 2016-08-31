'use strict';

const express = require('express');
const router = express.Router();

const DB = require('../controllers/dbDriver').DB;

/*
 Route map:
 method    url               action
 get       /users            show all users
 get       /users/:id        show user by id

 get       /users/add        show form for adding new user
 post      /users            create new user (send post request via AJAX and redirect to /users)

 get       /users/:id/edit   show form for updating user by id
 put       /users/:id        update user info by user id (send put request via AJAX and redirect to /users)

 delete    /users/:id        delete user by id (confirm, then send delete request via AJAX and redirect to /users)
 */

// delete user (ajax) +
router.delete('/users/:id', (req, res) => {
    DB.deleteUser(req.params.id).then(
        done => res.send({status: 'ok', msg: done}),
        error => res.send({status: `error: ${error}`})
    );
});

// edit user (form) +
router.get('/users/:id/edit', (req, res) => {
    DB.getUserByID(req.params.id).then(
        user => {
            const data = {
                title: `Edit User | ${user.firstName} ${user.lastName}`,
                user: user
            };
            if (req.query.format === 'json') {
                res.send(data);
            } else {
                res.render('./users/userEdit', data);
            }
        },
        error => res.send({status: `error: ${error}`})
    );
});

// edit user (ajax) +
router.put('/users/:id', (req, res) => {
    DB.editUser(req.body).then(
        done => res.send({status: 'ok', msg: done}),
        error => res.send({status: `error: ${error}`})
    );
});

// add new user (form) +
router.get('/users/add', (req, res) => {
    if (req.query.format === 'json') {
        res.send(data);
    } else {
        res.render('./users/userAdd', {title: "New User"});
    }
});

// add new user (ajax) +
router.post('/users', (req, res) => {
    DB.addUser(req.body).then(
        done => res.send({status: 'ok', msg: done}),
        error => res.send({status: `error: ${error}`})
    );
});

// get user by id (table) +
router.get('/users/:id', (req, res) => {
    DB.getUserByID(req.params.id).then(
        user => {
            const data = {
                title: `${user.firstName} ${user.lastName}`,
                user: user
            };
            if (req.query.format === 'json') {
                res.send(data);
            } else {
                res.render('./users/user', data);
            }
        },
        error => res.send({status: `error: ${error}`})
    );
});

// get all users (table) +
router.get('/users', (req, res) => {
    DB.getAllUsers.then(
        users => {
            const data = {
                title: "Users",
                users: users
            };
            if (req.query.format === 'json') {
                res.send(data);
            } else {
                res.render('./users/users', data);
            }
        },
        error => res.send({status: `error: ${error}`})
    );
});

// force redirect to avoid confusion at this stage, since home page is missing...
router.get('/', (req, res) => {
    res.redirect('/users');
});

/*-------------------------------
 Sync routes to work w/o AJAX
 ------------------------------*/
/**/
// add user (sync)
router.post('/users/add', (req, res) => {
    DB.addUser(req.body).then(
        done => res.redirect('/users'),
        error => res.send(error)
    );
});

// edit (sync)
router.post('/users/:id/edit', (req, res) => {
    DB.editUser(req.body).then(
        done => res.redirect('/users'),
        error => res.send(error)
    );
});

// delete user (sync)
router.get('/users/:id/delete', (req, res) => {
    DB.deleteUser(req.params.id).then(
        done => res.redirect('/users'),
        error => res.send(error)
    );
});

module.exports = router;
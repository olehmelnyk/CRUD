'use strict';

const express = require('express');
const router = express.Router();

const db = require('../models/db');

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

// delete user (ajax)
router.delete('/users/:id', (req, res) => {
  db.deleteUser(+req.params.id);
  res.send({status: 'ok'});
});

// update user info (form)
router.get('/users/:id/edit', (req, res) => {
  let uid = +req.params.id;
  let user = db.getUserByID(uid);
  let data = {
    title: `Edit User | ${user.firstName} ${user.lastName}`,
    uid: uid,
    user: user
  };
  res.render('./users/userEdit', data);
});

// update user info (ajax)
router.put('/users/:id', (req, res) => {
  db.updateUser(req.body);
  res.send({status: 'ok'});
});

// add new user (form)
router.get('/users/add', (req, res) => {
  let data = {
    title: "New User"
  };
  res.render('./users/userAdd', data);
});

// create new user (ajax)
router.post('/users', (req, res) => {
  db.addNewUser(req.body);
  res.send({status: 'ok'});
});

// user by id (table)
router.get('/users/:id', (req, res) => {
  let uid = +req.params.id;
  let user = db.getUserByID(uid);
  let data = {
    title: `${user.firstName} ${user.lastName}`,
    user: user
  };
  res.render('./users/user', data);
});

// all users (table)
router.get('/users', (req, res) => {
  let data = {
    title: "Users",
    users: db.read
  };
  res.render('./users/users', data);
});

// force redirect to avoid confusion at this stage, since home page is missing...
router.get('/', (req, res) => {
  res.redirect('/users');
});

/*-------------------------------
  Sync routes to work w/o AJAX
 ------------------------------*/

// create new user (sync)
router.post('/users/add', (req, res) => {
  db.addNewUser(req.body);
  res.redirect('/users');
});

// update user info (sync)
router.post('/users/:id/edit', (req, res) => {
  db.updateUser(req.body);
  res.redirect('/users');
});

// delete user (sync)
router.get('/users/:id/delete', (req, res) => {
  db.deleteUser(+req.params.id);
  res.redirect('/users');
});

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();

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
  const id = req.params.id;
  User.findByIdAndRemove(id, err => {
    if (err) res.send({status: `error: ${err}`});
    res.send({status: 'ok'});
  });
});

// update user info (form)
router.get('/users/:id/edit', (req, res) => {
  const id = req.params.id;
  User.find({_id: id}, (err, user) => {
    if (err) res.send({status: `error: ${err}`});
    let data = {
      title: `Edit User | ${user[0].firstName} ${user[0].lastName}`,
      uid: id,
      user: user[0]
    };
    res.render('./users/userEdit', data);
  });
});

// update user info (ajax)
router.put('/users/:id', (req, res) => {
  const data = req.body;
  const user = {
    firstName: data.firstName,
    lastName: data.lastName
  };
  User.findByIdAndUpdate(data.id, user, (err, user) => {
    if (err) res.send({status: `error: ${err}`});
    // console.log(`Updated user data: ${user}`);
    res.send({status: 'ok'});
  });
});

// add new user (form)
router.get('/users/add', (req, res) => {
  const data = {
    title: "New User"
  };
  res.render('./users/userAdd', data);
});

// create new user (ajax)
router.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (!err) {
      // console.log(`User ${newUser} saved successfully!`);
    } else {
      res.send({status: `error: ${err}`});
    }
  });
  res.send({status: 'ok'});
});

// user by id (table)
router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.find({_id: id}, (err, user) => {
    if (err) res.send({status: `error: ${err}`});
    const data = {
      title: `${user.firstName} ${user.lastName}`,
      user: user[0]
    };
    res.render('./users/user', data);
  });
});

// all users (table)
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
    if (err) res.send({status: `error: ${err}`});
    const data = {
      title: "Users",
      users: users
    };
    res.render('./users/users', data);
  });
});

// force redirect to avoid confusion at this stage, since home page is missing...
router.get('/', (req, res) => {
  res.redirect('/users');
});

/*-------------------------------
  Sync routes to work w/o AJAX
 ------------------------------*/
/*
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
*/

module.exports = router;
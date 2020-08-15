const express = require('express');
// call the router
const router = express.Router();
// require the user model this is for instantiating newUser at line 20
let User = require('../models/user.model');

// if the user goes to /users/ => get request
router.route('/').get((req, res) => {
    // find the user from database
    User.find()
    .then(users => res.json(users)) // if the user is found from find() send res users
    .catch(err => res.status(400).json('Error:' + err)); // if not send res err
});

// if the user goes to /users/add/ => post request
router.route('/add').post((req, res) => {
    // get the username from the body
    const username = req.body.username;
    // create an instance of a user
    const newUser = new User({username});

    // promises
    newUser.save() // the newUser will save to the database
    .then(() => res.json('User added!')) // then return User added! in json
    .catch(err => res.json('Error: ' + err)); // or else return an err msg
});

// exporting the router
module.exports = router;
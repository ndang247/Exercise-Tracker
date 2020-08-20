const express = require('express');
// call the router
const router = express.Router();
// require the user model this is for instantiating newUser at line 24
const Exercise = require('../models/exercise.model');

// if the user goes to /exercises/ => get request
router.route('/').get((req, res) => {
    // find the exercise from database
    Exercise.find()
    .then(exercises => res.json(exercises)) // if the exercise is found from find() send res exercises
    .catch(err => res.status(400).json('Error:' + err)); // if not send res err
}); 

// if the user goes to /exercises/add/ => post request
router.route('/add').post((req, res) => {
    // get the username, description, duration and date from the body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    // create an instance of exercise
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    // promises
    newExercise.save() // the newExercise will save to the database
    .then(() => res.json('Exercise added!')) // then return Exercise added! in json
    .catch(err => res.json('Error: ' + err)); // or else return an err msg
});

// GET request a json object from the database using id
// then only return the information of that object id
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error ' + err));
});

// DELETE request a json object from the database using id
// then only delete that object
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Excersie deleted.'))
    .catch(err => res.status(400).json('Error ' + err));
});

// UPDATE request a json object from the database using id
// then only update that object
router.route('/update/:id').post((req, res) => {
    // find the current exercise then update it
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        
        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});



// exporting the router
module.exports = router;

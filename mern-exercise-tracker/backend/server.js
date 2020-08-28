const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

// store the connection's string
const uri = process.env.ATLAS_URI;
// connection to the cloud database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection; 
// once connected execute the callback
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// require the files in routes dir
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// when user goes to there end point the file in routes will be used
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// first required mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user schema has only a single field i.e. username
const userShema = new Schema({
    username: {
        // validation for the username
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
},  {
    timestamps: true
});

const User = mongoose.model('User', userShema);

module.exports = User;

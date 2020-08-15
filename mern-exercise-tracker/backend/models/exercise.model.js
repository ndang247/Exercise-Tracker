// first required mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema is to define the type of field and whether it is required
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: { type: Date, required: true}
},  {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
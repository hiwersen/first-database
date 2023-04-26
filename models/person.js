const mongoose = require('mongoose');
const { Schema } = mongoose;
const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: Number
});
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
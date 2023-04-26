require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/person');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async () => {

    console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`);

    const newPerson = new Person({
        firstName: "John",
        lastName: "Doe",
        age: 18
    });

    try {
        const savedPerson = await newPerson.save();
        console.log('Saved person: ' ,savedPerson);
    } catch (err) {
        console.error('Error saving person: ', err);
    }

    
    let arrayOfPeople = [
        {
            firstName: "Michael",
            lastName: "Ozborn",
            age: 53
        },
        {
            firstName: "Liam",
            lastName: "Simpson",
            age: 41
        }
      ];

    const people = Person.create(arrayOfPeople);

    try {
        const savedPeople = await people;
        console.log('Saved people: ', savedPeople);

    } catch (err) {
        console.error('Error saving people: ', err);
    }

    try {
        const retrievedPeople = await Person.find();
        console.log('Retrieved people: ' , retrievedPeople);
    } catch (err) {
        console.error('Error retrieving people: ', err);
    }
});

const listener = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



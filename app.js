// plik apki z opcjami

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://RobertS:<passwd>@databasetests.cijhh.mongodb.net/?retryWrites=true&w=majority'
);

// importuję expressa
const express = require('express');

const morgan = require('morgan');

// tworzę instancję expressa
const app = express();

app.use(morgan('combined'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routy
const polutionRouts = require('./api/routes/polutions');
app.use('/polutions', polutionRouts);

app.use((req, res) => {
  res.status(404).json({ wiadomosc: 'not found' });
});

// eksport apki
module.exports = app;

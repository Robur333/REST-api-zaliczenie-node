const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://RobertS:@databasetests.cijhh.mongodb.net/?retryWrites=true&w=majority'
);

const express = require('express');

const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const polutionRouts = require('./api/routes/users');
app.use('/users', polutionRouts);

app.use((req, res) => {
  res.status(404).json({ wiadomosc: 'not found' });
});

module.exports = app;

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dbURI = 'mongodb+srv://sayamAlvi:sayamAlvi@cluster0.chzyy2x.mongodb.net/first?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => console.log("Connected"))
  .catch((err) => console.log(err));
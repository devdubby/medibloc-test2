const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/keys');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const db = config.mongoURI;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db,{ useNewUrlParser: true })
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

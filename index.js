const express = require('express');

const app = express();
const passport = require('passport');
const passportSetup = require('./config/setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoute');

mongoose.connect('mongodb://localhost:27017/photoShare', 
    { useNewUrlParser: true, 
      useCreateIndex: true, 
      useFindAndModify:false }).then(success => {
        console.log('Connected to the database');
      }).catch(err => {
        console.log(err);
      });


app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookie]
}));

//passport

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');


app.use('/auth', authRoutes);
app.use('/', profileRoutes);

app.listen(3000, () => {
    console.log('app running on port 3000');
});
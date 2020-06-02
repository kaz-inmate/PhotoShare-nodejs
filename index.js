const express = require('express');

const app = express();
const passport = require('passport');
const passportSetup = require('./config/setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const multerStorage = require('./config/media');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoute');
const homeRoutes = require('./routes/postRoute');

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

app.use(express.static('public'));

app.use('/', profileRoutes);
app.use('/auth', authRoutes);
app.use('/homepage', homeRoutes);

app.listen(3000, () => {
    console.log('app running on port 3000');
});
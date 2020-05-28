const passport = require('passport');
const googleStrat = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    }).catch(err => {
        console.log(err);
    }); 
});


passport.use(
    new googleStrat({

    callbackURL:'/auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {

    User.findOne({googleId: profile.id}).then(oldUser => {
        if (oldUser) {
            console.log("Welcome ", oldUser.username);
            done(null, oldUser);

        } else {
            new User({
                username:profile.displayName,
                googleId:profile.id
            }).save().then(newUser => {
                console.log('New user created');
                done(null, newUser);
            });
        }
    }).catch(err => {
        console.log(err);
    });
    
  
}));


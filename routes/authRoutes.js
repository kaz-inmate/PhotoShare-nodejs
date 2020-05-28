const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('login.ejs', {user:req.user});
});


//google auth

router.get('/google', passport.authenticate('google' , {
    scope: ['profile']
}));


//callback route

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
   res.redirect('/profile');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
});

module.exports = router;
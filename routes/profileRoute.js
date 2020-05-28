const express = require('express');
const router = express.Router();
const passport = require('passport');

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}

router.get('/home', (req, res) => {
    res.render('home.ejs', {user:req.user});
});


router.get('/profile', authCheck, (req, res) => {
    res.render('profile.ejs', {user: req.user});
});



module.exports = router;
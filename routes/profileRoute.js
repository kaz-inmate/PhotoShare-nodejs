const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = require('../config/auth');


router.get('/home', (req, res) => {
    res.render('home.ejs', {user:req.user});
});


router.get('/profile', authCheck, (req, res) => {
    res.render('profile.ejs', {user: req.user});
});



module.exports = router;
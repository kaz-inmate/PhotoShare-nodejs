const express = require('express');
const router = express.Router();
const multerStorage = require('./config/media');
const Post = require('../models/Post');
const authCheck = require('../config/auth');

router.get('/', authCheck, (req, res) => {
    Post.find({}).populate('author').then(posts => {
        res.render('homepage.ejs', {posts:posts});
    })
    .catch(err => {
        console.log(err);
    }); 
});

router.post('/upload', authCheck, (req, res) => {
    multerStorage.uploader(req, res, (err) => {
        if (err) {
            res.render('homepage.ejs', {msg:err});
        } else {
            const newPost = new Post({
                caption:req.body.caption,
                author:req.user._id,
                image:req.file.path
            });

            newPost.save().then(post => {
                console.log('post saved');
                res.redirect('/homepage');
            }).catch(err => {
                console.log(err);
            });
        }
    });
});


module.exports = router;
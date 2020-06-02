const mongoose = require('mongoose');
const User = require('./User');


const postSchema = new mongoose.Schema({
    caption: {
        type:String,
    },
    author : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
    },
    image: {
        type:String,
        required:true
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
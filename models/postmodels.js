const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    imagelink:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', PostSchema)
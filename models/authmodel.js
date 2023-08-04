const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

})


module.exports = mongoose.model('User', UserSchema)
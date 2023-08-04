const express = require('express')
const router = express.Router()
const Post = require('../models/postmodels')
const auth = require('../middileware/auth')
const User = require('../models/authmodel')


router.get('/',auth, async(req,res)=>{
    try {
        const posts = await Post.find({}).populate('author')
        console.log(posts)
        const recent_post = await Post.find({}).sort({_id: -1})
        res.render('home', {posts, recent_post})
    } catch (error) {
        console.log(error)
    }
})

router.get('/Post/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate('author')
        const recent_post = await Post.find({}).sort({_id: -1})
        res.render('post_details', {post, recent_post})
    } catch (error) {
        console.log(error)
    }
})

router.get('/create',auth, async(req,res)=>{
    try {

        const current_user = req.user
        if(current_user){
            res.render('newpost')
        }
        res.send('login first')
       
    } catch (error) {
        
    }
})

router.post('/create',auth, async(req,res)=>{
    try {
        if(req.user){
            console.log(req.user)
            const userId = req.user.user_id
            const post = new Post(req.body)
            post.author = userId
 
            post
            .save() 
            .then(() => User.findById(userId))
            .then((user) => {
              user.posts.unshift(post);
              user.save();
              // REDIRECT TO THE NEW POST
              return res.redirect('/');
            })
            console.log(userId)
         }
    } catch (error) {
        console.log(error)
    }
})

router.get('/details', async(req,res)=>{
    try {
        res.render('post_details')
    } catch (error) {
        
    }
})

router.get('/create', async(req,res)=>{
    try {
        res.render('newpost')
    } catch (error) {
        
    }
})



module.exports = router
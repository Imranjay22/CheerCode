const express = require('express')
const router = express.Router()
const User = require('../models/authmodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// login routes 

router.get('/login', async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        
    }
})

router.post('/login', async(req,res)=>{
    try {
            const { email, password} = req.body
            if(!email && !password){
                res.send('all inputs are reqired')
            } 

            //validate if user exits in database
            const user = await User.findOne({email})
             if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.token_key,
              {
                expiresIn: "2h",
              }
            );
            res.cookie('jwtToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Set a 24-hour expiration time
         
            // user
            res.redirect('/');
          }
          console.log('invalid credentials')

    } catch (error) {
        console.log(error)
    }
})



/// sign up routes

router.get('/signup', async(req,res)=>{
    try {
        res.render('signup')
    } catch (error) {
        
    }
})

router.post('/signup', async(req,res)=>{


    try {
       //get user 
       const {fname, lname, email, password} = req.body

        if(!fname && !lname && !email && !password){
            res.send(' All inputs are required')
        }

        // check if already exits

        const oldUser = await User.findOne({email})
        if(oldUser){
            res.send('this email is already exits')
        }
        encrypt_password = await bcrypt.hash(password, 10)
        const user = await User.create({
            fname,
            lname,
            email,
            password: encrypt_password
        })
        res.redirect('/')

    }catch (error) {
        console.log(error)
    }
})


// logout route
router.get('/logout', (req,res)=>{
    res.clearCookie('jwtToken')
    res.redirect('/')
})






module.exports = router
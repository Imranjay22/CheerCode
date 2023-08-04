require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = new express()




app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// mongodb database conection

mongoose.connect(process.env.mongo_url, ({useNewUrlParser: true}))
    .then(()=>{
        console.log('mongoose succesfully conected!')
    })

    .catch((err)=>{
        console.log(err)
    })

// all routes import here!

const home = require('./routes/post_routes')
const auth = require('./routes/auth_routes')



app.use('/', home)
app.use('/user', auth)








app.listen(process.env.port, ()=>{
    console.log('SERVER IS RUNNING ON PORT: ', process.env.port)
})
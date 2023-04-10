const express = require('express');
const router = express.Router();

// User Model
// const User = require('../models/Users');

// Login Page
router.get('/login', (req,res)=> res.render('login'))

// Register Page
router.get('/register', (req,res)=> res.render('register'))

// Register Handler
router.post('/register',(req, res)=>{
    const { name, email, password, password2} = req.body;
    let errors = []

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    // Check Password match
    if(!password || !password2){
        errors.push({msg: 'Passwords do not match'})
    }

    // Check Pass length
    if(!password.length < 6){
        errors.push({msg: 'Password length must be 6 characters'})
    }
    if(errors.length > 0){ 
        res.render('register',{
            errors,
            name, 
            email,
            password,
            password2
        })
    }else{
        res.send('pass')
        console.log('req.body');
    }
})

module.exports = router;    
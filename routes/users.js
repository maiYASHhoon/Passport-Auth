const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

// User Model
const User = require('../models/Users');

// Login Page
router.get('/login', (req,res)=> res.render('login'))

// Register Page
router.get('/register', (req,res)=> res.render('register'))

// Register Handler
router.post('/register',(req, res)=>{

    // console.log(req.body);
    // res.send('Hello')
    try {
    const { name, email, password, password2} = req.body;
    let errors = []

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    // Check Password match
    if(password != password2){
        errors.push({msg: 'Passwords do not match'})
    }

    // Check Pass length
    if(password.length < 6){
        errors.push({msg: 'Password length must be 6 characters'})
    }
    console.log(errors)
    if(errors.length > 0){ 
       
        res.render('register',{
            errors,
            name, 
            email,
            password,
            password2
        })
    }else{
        // validation pass
        User.findOne({email: email})
        .then(user => {
            if(user){
                // user Exist
                errors.push({ msg: 'User email already exists'})
                res.render('register',{
                    errors,
                    name, 
                    email,
                    password,
                    password2
                })
            }else{
                const newUser = new User({
                    name, 
                    email,
                    password
                })
                
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        // Set Password to hashed
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                )
            }
        })
    }
    } catch (error) {
        console.log('error');
    }
    
})

module.exports = router;    
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

// Welcome Page
router.get('/', (req,res)=> res.render('welcome'))
// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req,res)=>
{
console.log(ensureAuthenticated, req.user)

    res.render('dashboard', {
    user : req.user.name
})})

module.exports = router;
const express = require('express');
const router = express.Router();

const User = require('../../models/users');

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

// login check
router.post('/login', (req, res) => {
    res.render('login');
});

// register page
router.get('/register', (req, res) => {
    res.render('register');
});

// register check
router.post('/register', (req, res) => {
    res.render('register');
});

// logout
router.get('/logout', (req, res) => {
    res.render('logout');
});

module.exports = router;

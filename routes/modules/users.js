const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/users');

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

// login check
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}));

// register page
router.get('/register', (req, res) => {
    res.render('register');
});

// register check
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    User.findOne({ email }).then(user => {
        if(user) {
            console.log('User already exists');
            res.render('register', { name, email, password, confirmPassword });
        }
        return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }).catch(err => console.log(err));
});

// logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if(err) return next(err);
        res.redirect('/users/login');
    }); 
});

module.exports = router;

const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/users')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  let userName = ""
  if (name === "") userName = email.split('@')[0]
  else userName = name

  const errors = []
  if (!email || !password || !confirmPassword) errors.push({ message: 'Email、Password and Confirm Password are required.' })
  if (password !== confirmPassword) errors.push({ message: 'Password and Confirm Password do not match.' })
  if (errors.length) return res.render('register', { errors, name: userName, email, password, confirmPassword })

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email already exists.' })
      return res.render('register', { errors, name: userName, email, password, confirmPassword })
    }

    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name: userName,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }).catch(err => console.log(err))
})

// logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)

    req.flash('success_msg', 'You have successfully logged out.')
    res.redirect('/users/login')
  })
})

module.exports = router

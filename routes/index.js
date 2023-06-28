const express = require('express')
const router = express.Router()

const auth = require('./modules/auth')
const home = require('./modules/home')
const users = require('./modules/users')
const restaurants = require('./modules/restaurants')

const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/', authenticator, home)

module.exports = router

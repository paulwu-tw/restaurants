const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const hbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const helpers = require('./plugins/hbs-helper')

// model and db config
const restaurantsModel = require('./models/restaurants')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers
}))
app.set('view engine', 'hbs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
// add midelware to authenticate
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})

app.use(routes)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
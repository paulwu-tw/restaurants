const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const restaurantsModel = require('./models/restaurants')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
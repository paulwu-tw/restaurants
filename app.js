const express = require('express')
const hbs = require('express-handlebars')
const restaurantsModel = require('./models/restaurants')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    restaurantsModel.find()
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
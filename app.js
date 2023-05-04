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


// index page, brose restaurants
app.get('/', (req, res) => {
    restaurantsModel.find()
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

// new a restaurant
// GET /restaurants/new
// POST /restaurants

// show a restaurant detail
//GET /restaurants/:id
app.get('/restaurants/:id', (req, res) => {
    const id = Number(req.params.id)
    restaurantsModel.findOne({ id: id })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(err => console.log(err))

})

// edit a restaurant info
// GET /restaurants/:id/edit
// POST /restaurants/:id/edit

// delete a restaurant
// POST /restaurants/:id/delete

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
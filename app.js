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

// search restaurants
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    restaurantsModel.find()
        .lean()
        .then(restaurantList => {
            const restaurants = restaurantList.filter(restaurant =>
                restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase())
                || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase()))

            if (restaurants.length) res.render('index', { restaurants, keyword })
            else res.render('error', { keyword })
        })
})

// new a restaurant
// GET /restaurants/new
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

// POST /restaurants
app.post('/restaurants', (req, res) => {
    const info = req.body
    restaurantsModel.countDocuments().then(count => {
        count++
        info['id'] = count
        restaurantsModel.create(info)
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })
})

// show a restaurant detail
//GET /restaurants/:id
app.get('/restaurants/:id', (req, res) => {
    const id = Number(req.params.id)
    restaurantsModel.findOne({ id })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(err => console.log(err))

})

// edit a restaurant info
// GET /restaurants/:id/edit
app.get('/restaurants/:id/edit', (req, res) => {
    const info = req.body
    const id = Number(req.params.id)
    restaurantsModel.findOne({ id })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// POST /restaurants/:id/edit
app.post('/restaurants/:id/edit', (req, res) => {
    const info = req.body
    const id = Number(req.params.id)
    restaurantsModel.updateOne({ id }, info)
        .then(() => res.redirect(`/restaurants/${id}`))
})

// delete a restaurant
// POST /restaurants/:id/delete
app.post('/restaurants/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    restaurantsModel.deleteOne({ id })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
const express = require('express')
const router = express.Router()

const restaurantsModel = require('../../models/restaurants')

// index page, brose restaurants
router.get('/', (req, res) => {
    restaurantsModel.find()
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(err => console.log(err))
})

// search restaurants
router.get('/search', (req, res) => {
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

module.exports = router
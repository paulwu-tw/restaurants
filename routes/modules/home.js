const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

// index page, brose restaurants
router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurants.find({ userId })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// search restaurants
router.get('/search', (req, res) => {
    const userId = req.user._id
    const { keyword, sort } = req.query
    // console.log(sort)
    Restaurants.find({ userId })
        .lean()
        .sort(`${sort}`)
        .then(restaurantList => {
            const restaurants = restaurantList.filter(restaurant =>
                restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase())
                || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase()))

            if (restaurants.length) res.render('index', { restaurants, keyword, sort })
            else res.render('noResult', { keyword })
        })
})

module.exports = router
const express = require('express')
const router = express.Router()

const restaurantsModel = require('../../models/restaurants')

// new a restaurant
// GET /restaurants/new
router.get('/new', (req, res) => {
    res.render('new')
})

// POST /restaurants
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    restaurantsModel.findOne({ id })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(err => console.log(err))

})

// edit a restaurant info
// GET /restaurants/:id/edit
router.get('/:id/edit', (req, res) => {
    const info = req.body
    const id = Number(req.params.id)
    restaurantsModel.findOne({ id })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

// POST /restaurants/:id/edit
router.post('/:id/edit', (req, res) => {
    const info = req.body
    const id = Number(req.params.id)
    restaurantsModel.updateOne({ id }, info)
        .then(() => res.redirect(`/restaurants/${id}`))
})

// delete a restaurant
// POST /restaurants/:id/delete
router.post('/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    restaurantsModel.deleteOne({ id })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router
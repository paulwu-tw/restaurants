const express = require('express')
const router = express.Router()

const restaurantsModel = require('../../models/restaurants')

// new a restaurant
// GET /restaurants/new
router.get('/new', (req, res) => {
    res.render('new')
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// POST /restaurants
router.post('/', (req, res) => {
    const info = req.body
    restaurantsModel.create(info)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// show a restaurant detail
//GET /restaurants/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    restaurantsModel.findOne({ _id: id })
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// edit a restaurant info
// GET /restaurants/:id/edit
router.get('/:id/edit', (req, res) => {
    const info = req.body
    const id = req.params.id
    restaurantsModel.findOne({ _id: id })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// PUT /restaurants/:id
router.put('/:id', (req, res) => {
    const info = req.body
    const id = req.params.id
    restaurantsModel.updateOne({ _id: id }, info)
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

// delete a restaurant
// DELETE /restaurants/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    restaurantsModel.deleteOne({ _id: id })
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err)
            res.render('errPage', { errMsg: err.message })
        })
})

module.exports = router
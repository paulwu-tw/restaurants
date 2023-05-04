const db = require('../../config/mongoose')
const restaurantsModel = require('../restaurants')

const restaurants = require('./restaurant.json').results


db.once('open', () => {

    // stupid way...
    // restaurants.forEach(restaurant => {
    //     restaurantsModel.create({
    //         id: restaurant.id,
    //         name: restaurant.name,
    //         name_en: restaurant.name_en,
    //         category: restaurant.category,
    //         image: restaurant.image,
    //         location: restaurant.location,
    //         phone: restaurant.phone,
    //         google_map: restaurant.google_map,
    //         rating: restaurant.rating,
    //         description: restaurant.description
    //     })
    // })

    restaurantsModel.create(restaurants)
        .catch(err => console.log(err))

    console.log("Create seeds done.")
})

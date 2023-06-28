const db = require('../../config/mongoose')
const Restaurant = require('../restaurants')
const User = require('../users')
const bcrypt = require('bcryptjs')

const restaurants = require('./restaurant.json').results

const SEED_USERS = [
    {
        name: 'user1',
        email: 'user1@example.com',
        password: '12345678',
        list: [0, 1, 2]
    },
    {
        name: 'user2',
        email: 'user2@example.com',
        password: '12345678',
        list: [3, 4, 5]
    }
]

db.once('open', () => {
    Promise.all(SEED_USERS.map(SEED_USER => 
        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER.password, salt))
            .then(hash => User.create({
                name: SEED_USER.name,
                email: SEED_USER.email,
                password: hash
            }))
            .then(user => {
                const userId = user._id
                const restaurant = SEED_USER.list.map(index => {
                    restaurants[index].userId = userId
                    return restaurants[index]
                })
                return Restaurant.create(restaurant)
            })
    ))
        .then(() => {
            console.log('done')
            process.exit()
        })
})

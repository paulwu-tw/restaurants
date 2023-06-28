const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurnatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    require: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('restaurants', restaurnatSchema)

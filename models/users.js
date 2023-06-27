const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: false 
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
});

module.exports = mongoose.model('user', userSchema);


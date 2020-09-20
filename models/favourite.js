const mongoose = require('mongoose');
const FavouriteScheme = mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'register',
        required: true
    },

    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spareproduct',
        required: true
    },
    name: String,
    price: String,
    description: String,
    specification: String
})
module.exports = mongoose.model('favourite', FavouriteScheme);
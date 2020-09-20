const mongoose = require('mongoose');
const SpecialViewSchema = mongoose.Schema({
    name: String,
    model: String,
    price: Number,
    description: String,
    image: String,
    specification: String
});
module.exports = mongoose.model('special_view', SpecialViewSchema);

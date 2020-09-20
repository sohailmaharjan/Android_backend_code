const mongoose = require('mongoose');
const allVehicleSchema = mongoose.Schema({
    name: String,
    model: String,
    price: Number,
    description: String,
    image: String,
    specification: String
});
module.exports = mongoose.model('vehicle', allVehicleSchema);

const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userid: String,
    name: String,
    price: Number,
    billingaddress: String,
    billingnumber: String,
    ordernumber: String,
    dispatched: String
});
module.exports = mongoose.model('RentRequest', orderSchema);
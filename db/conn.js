const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vechicalRental:vr123456789@cluster0.y7pyz.mongodb.net/rental', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then((db) => {
        console.log("Connection Success!!");
    }, (err) => console.log(err));
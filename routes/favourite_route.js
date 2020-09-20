const express = require('express');
const mongoose = require('mongoose');
const Favourite = require('../models/favourite');
const router = new express.Router();
const bodyParser = require('body-parser');
var app = express();
const Product = require('../models/allvehicle');
const auth = require('../auth')
router.get('/', function (req, res) {
    Favourite.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post('/addcart', (req, res, next) => {
    Favourite.create({
        productid: req.body.productid,
        userid: req.body.userid,
        price: req.body.price,
        name: req.body.name,
        description: req.body.description,
        specification: req.body.specification
    }).then((favourite) => {
        console.log(req.body);
        res.json({ status: "Favourite saved successfully" });
    }).catch(next);
});
router.post('/addcart1', (req, res, next) => {
    console.log(req.body.productid);
    console.log("This is name" + req.body.name)
    Favourite.create({
        productid: req.body.productid,
        userid: req.body.userid,
        price: req.body.product.price,
        name: req.body.product.name,
        description: req.body.product.description,
        specification: req.body.product.specification
    }).then((bookmark) => {
        console.log(req.body);
        res.json({ status: "We saved your favourite" });
    }).catch(next);
});

router.delete('/deletecart/:id', function (req, res) {
    Favourite.findByIdAndDelete(req.params.id, req.body, function (err, register) {
        if (err) return next(err);
        res.json(register);
    });
});
router.post("/checkcart", function (req, res) {
    const pp = Favourite.find({ productid: req.body.productid, userid: req.body.userid }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "Record addded here" });
        }
        else {
            res.send({ status: "Record can't be added" });
        }
    })
})



router.post("/checkcart90", function (req, res) {
    const pp = Favourite.find({ productid: req.body.productid, userid: req.body.userid }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "Record addded here" });
        }
        else {
            res.send({ status: "Record can't be added" });
        }
    })
})



router.get("/checkcart1/:id", auth.verifyUser, function (req, res) {
    const pp = Favourite.find({ productid: req.params.id, userid: req.register._id }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "Record addded here" });
        }
        else {
            res.send({ status: "Record can't be added" });
        }
    })
})

router.get('/check/:id', (req, res, next) => {
    Favourite.find({ userid: req.params.id }).then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.route('/cartsitem')
    .get((req, res, next) => {
        Favourite.find({ userid: req.cart.userid })
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })

module.exports = router;

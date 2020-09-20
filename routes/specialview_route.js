const express = require('express');
const router = express.Router();
const SpecialViewRoute = require('../models/specialview');
router.post('/addspecialvehicle', (req, res, next) => {
    SpecialViewRoute.create({
        name: req.body.name,
        model: req.body.model,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        specification: req.body.specification
    }).then((specialviewroute) => {
        res.json({ status: "Vehicle added successfully" });
    }).catch(next);
});
router.get('/getspecialvehicle', (req, res, next) => {
    SpecialViewRoute.find()
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

router.delete('/deletemainproduct/:id', function (req, res, next) {
    SpecialViewRoute.findByIdAndDelete(req.params.id).then(response => {
        console.log("Vehicle deleted successfully")
    })
})
router.get('/:id', function (req, res) {
    SpecialViewRoute.findById(req.params.id)
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
})

router.put('/updatespecialview/:id', (req, res, next) => {
    SpecialViewRoute.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        specification: req.body.specification,
        price: req.body.price
    }, { new: true })
});

router.get('/getproductc', (req, res, next) => {

    SpecialViewRoute
        .find()
        .sort('-_id')
        .populate('category')
        .exec(function (error, results) {
            res.send(results);
        });
})

module.exports = router;
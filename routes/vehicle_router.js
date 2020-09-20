const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vehicle = require("../models/allvehicle");

router.post("/addvehicle", (req, res, next) => {
  Vehicle.create({
    name: req.body.name,
    model: req.body.model,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    specification: req.body.specification
  })
    .then(vehicle => {
      res.json({ status: "Vehicle added successfully" });
      console.log("Name is " + req.body.name);
    })
    .catch(next);
});

router.get("/getVehicle", (req, res, next) => {
  Vehicle.find()
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

router.delete("/deleteproduct/:id", function(req, res, next) {
  Vehicle.findByIdAndDelete(req.params.id).then(response => {
  });
});

router.get("/:id", function(req, res) {
  Vehicle.findById(req.params.id)
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

router.put("/updateproduct/:id", function(req, res, next) {
  var id = req.params.id;
  Vehicle.findOne({ _id: id }, function(err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.name) {
          foundObject.name = req.body.name;
        }
        if (req.body.price) {
          foundObject.price = req.body.price;
        }
        if (req.body.description) {
          foundObject.description = req.body.description;
        }

        foundObject.save(function(err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
});

router.get("/getproductc", (req, res, next) => {
  Vehicle.find()
    .sort("-_id")
    .populate("category")
    .exec(function(error, results) {
      res.send(results);
    });
});

module.exports = router;

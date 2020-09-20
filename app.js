const auth = require("./auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
var app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const registerRoute = require("./routes/register_route");
const categoryRoute = require("./routes/category_route");
const uploadRouter = require('./routes/upload_route');
const vehicleRouter = require('./routes/vehicle_router');
const NotificationRoute = require('./routes/notification_route');
const SpecialViewRoute = require('./routes/specialview_route');
const FavouriteRoute = require('./routes/favourite_route');
const OrderRoute = require('./routes/orders_router');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(morgan("tiny"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
require("./db/conn");
app.use(express.json());

app.use("/register", registerRoute);
app.use("/category", categoryRoute);
app.use('/upload', uploadRouter);
app.use('/vehicle', vehicleRouter);
app.use('/notification', NotificationRoute);
app.use('/offer', SpecialViewRoute);
app.use('/favourite', FavouriteRoute);
app.use('/order', OrderRoute);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});
app.listen(process.env.PORT, () => {
  console.log(`App is running on port:${process.env.PORT}`);
});

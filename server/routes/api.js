const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ProductData = require('../models/Productdata');
var ObjectId = require('mongodb').ObjectID;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();

}

router.get('/products', verifyToken, function(req, res) {
    console.log("haiii");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    ProductData.find()
        .then(function(products) {
            res.send(products);
        });
});



router.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    console.log(req.body);
    let userData = req.body;
    console.log(userData.email);
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    });
});

router.post('/login', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    console.log("gaiii");
    let userData = req.body
    console.log(userData);
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password');
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                        // res.status(200).send(user)
                }
            }
        }
    })
});

router.post('/insert', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    console.log(req.body);
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();

});

router.get('/product', verifyToken, function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    var id = ObjectId.createFromHexString(req.query._id);
    console.log(id);
    ProductData.findOne({ _id: id })
        .then(function(products) {
            console.log(products);
            res.send(products);
        });
});

router.post('/update', verifyToken, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    console.log(req.body);
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    var id = req.body.id;
    console.log(id + "id get");
    // var product = new ProductData(product);
    // product.save();
    ProductData.updateOne({ _id: id }, { $set: { 'productId': product.productId, 'productName': product.productName, 'productCode': product.productCode, 'releaseDate': product.releaseDate, 'description': product.description, 'price': product.price, 'starRating': product.starRating, 'imageUrl': product.imageUrl } }, (err, result) => {
        if (err) {
            return console.log(err);
        }
    });

});

router.post('/delete', verifyToken, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTION');
    console.log(req.body);
    var id = req.body.id;
    console.log(id + "id get");
    // var product = new ProductData(product);
    // product.save();
    ProductData.deleteOne({ _id: id })
        // .then(function(product) {
        // });
        .then(function(products) {
            console.log(products);
            res.send(products);
        });

});

router.get('/', (req, res) => {
    res.send("From API");
})


module.exports = router;
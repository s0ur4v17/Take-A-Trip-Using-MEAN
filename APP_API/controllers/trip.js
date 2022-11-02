const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

//Get Single Movie.
const getPackage = function (req, res) {
    if(req.params && req.params.packageId) {
        Trip
            .findById(req.params.packageId)
            .exec((err, packageData) => {
                if(!packageData) {
                    res
                    .status(404)
                    .json({
                        "message":"No data found."
                    });
                    return;
                } else if (err) {
                    res
                    .status(404)
                    .json(err);
                return;
                }
                res
                .status(200)
                .json(packageData);
            });
    } else {
        res
        .status(404)
        .json({
            "message": "packageId not found."
        });
    }
};

//Get List of all Movies.
const getPackageList = function (req, res) {
    Trip.find().exec(function(err, packageData) {
        if(err) {
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(packageData);
    });
};

//Delete a Movie.
const deletePackage = function (req, res) {
    const packageId = req.params.packageId;
    if(packageId) {
        Trip
        .findByIdAndRemove(packageId)
        .exec((err, packageData) => {
        if(err) {
            res
            .status(404)
            .json(err);
        return;
        }
    res
    .status(204)
    .json();
    });
    } else {
        res
        .status(404)
        .json({"message" : "packageId not found."});
}};

//Update a Movie.
const updatePackage = function (req, res) {
    if (!req.params.packageId) {
        res
        .status(404)
        .json({
            "message":"packageId is required."
        });
    return;
    }
    Trip.findById(req.params.packageId)
        .exec((err, packageData) => {
            if(!packageData) {
                res
            .status(404)
            .json({
                "message":"movieId not found."
            });
            return;
        } else if(err) {
            res
            .status(400)
            .json(err);
            return;
        }
        packageData.name = req.body.name;
        packageData.description = req.body.description;
        packageData.rating = parseInt(req.body.rating,10);
        packageData.image = req.body.image;
        packageData.cover = req.body.cover;
        packageData.duration = req.body.duration;
        packageData.facilities = req.body.facilities;
        packageData.services = req.body.services;
        packageData.save((err, packageData) => {
            if(err) {
                res
                .status(404)
                .json(err);
            } else {
                res
                .status(200)
                .json(packageData);
            }
        });
    });
};

//Create a Movie.
const createPackage = function (req, res) {
    Trip.create({
        name: req.body.name,
        description: req.body.description,
        rating: parseInt(req.body.rating,10),
        image: req.body.image,
        cover: req.body.cover,
        duration: req.body.duration,
        facilities: req.body.facilities,
        services: req.body.services

    }, (err, packageData) => {
        if(err) {
            res.status(400)
            .json(err);
        } else {
            res
            .status(201)
            .json(packageData);
        }
    });
};

module.exports = {
getPackage,
getPackageList,
deletePackage,
updatePackage,
createPackage
}
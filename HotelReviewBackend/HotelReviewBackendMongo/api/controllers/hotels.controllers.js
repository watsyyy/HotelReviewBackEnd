var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// var bookings_data = require('../data/data_100.json');

module.exports.hotelsGetAll = function (req, res) {

    // var start = 0;
    // var number = 5;
    // var maxNumber = 10;


    // if (req.query && req.query.start) {
    //     start = parseInt(req.query.start);
    // }

    // if (req.query && req.query.number) {
    //     number = parseInt(req.query.number);
    // }

    // if (isNaN(start) || isNaN(number)) {
    //     res
    //         .status(400)
    //         .json({ "message": "If supplied in querystring, start and number must be numeric " });
    //     return;
    // }

    // if (number > maxNumber) {
    //     res
    //         .status(400)
    //         .json({ "message": "Max value for number is " + maxNumber });
    //     return;
    // }

    Hotel
        .find()
        // .skip(start)
        // .limit(number)
        .exec(function (err, docs) {
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Retrieved the data for " + docs.length + " hotels");
                res
                    .status(200)
                    .json(docs);
            }
        })
};



module.exports.hotelsGetOne = function (req, res) {

    var hotelID = req.params.hotelID;
    console.log("GET the hotel " + hotelID);
    Hotel
        .findById(hotelID)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message": "hotel ID not found" };
            }
            console.log("Found the hotel" + hotelID);
            res
                .status(response.status)
                .json(response.message);

        });

}



module.exports.hotelsAddOne = function (req, res) {

    Hotel
        .create({
            Name: req.body.Name,
            Location: req.body.Location,
            HotelType: req.body.HotelType,
            Country: req.body.Country,
            Image: req.body.Image,
            Website: req.body.Website,
            review_count: req.body.review_count,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            reviews: [],
           

        }, function (err, newhotel) {
            if (err) {
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(newhotel);
            }
        });


}

module.exports.hotelsUpdateOne = function (req, res) {

    var hotelID = req.params.hotelID;
    console.log("PUT the hotel " + hotelID);
    Hotel
        .findById(hotelID)
        .select("-reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message": "hotel ID not found" };
            }
            console.log("Found the hotel " + hotelID);
            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {


                doc.Location = req.body.Location;
                
                doc.save(function (err, updatedhotel) {

                    if (err) {
                        res

                            .status(500)
                            .json(err);

                    } else {

                        res

                            .status(204)
                            .json();
                    };
                });

                };
            
        });

}

module.exports.hotelsDeleteOne = function(req, res) {
    var hotelID = req.params.hotelID;

    Hotel
    .findByIdAndRemove(hotelID)
    .exec(function(err, thishotel) {
        if (err) {
            res

            .status(404)
            .json(err);

        } else {

            console.log("hotel " + hotelID + " deleted");
            res

            .status(204)
            .json();
        }
        
    })
}



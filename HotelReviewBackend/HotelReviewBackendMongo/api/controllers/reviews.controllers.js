var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function (req, res) {
    var hotelID = req.params.hotelID;
    console.log("GET reviews for hotel " + hotelID);
    Hotel
        .findById(hotelID)
        .select("reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding hotel " + hotelID);
                response.status = 500;
                response.message = err;
            }
            else if (!doc) {
                console.log("Error finding hotel " + hotelID);
                response.status = 404;
                response.message = { "message": "hotel ID not found" }

            }


            else {
                response.message = doc.reviews ? doc.reviews : [];
            }
            console.log("Found hotel " + hotelID);
            res

                .status(response.status)
                .json(response.message);


        });
};

module.exports.reviewsGetOne = function (req, res) {

    var hotelID = req.params.hotelID;
    var reviewID = req.params.reviewID;
    console.log("GET reviews for hotel " + hotelID);
    Hotel
        .findById(hotelID)
        .select("reviews")
        .exec(function (err, doc) {
            var review = doc.reviews.id(reviewID);
            console.log("Found the hotel" + hotelID);
            res
                .status(200)
                .json(review);
        });

};

var addReview = function (req, res, thishotel) {
    thishotel.reviews.push({
        username: req.body.username,
        votes: { "funny": 0, "useful": 0, "cool": 0 },
        text: req.body.text,
        stars: parseInt(req.body.stars)
    });

    thishotel.save(function (err, updatedhotel) {
        if (err) {
            res

                .status(500)
                .json(err);
        } else {
            var newReviewPosition = updatedhotel.reviews.length - 1;
            var newReview = updatedhotel.reviews[newReviewPosition];
            res

                .status(201)
                .json(newReview);
        };

    });
};

module.exports.reviewsAddOne = function (req, res) {
    var hotelID = req.params.hotelID;
    console.log("GET reviews for hotel " + hotelID);
    Hotel
        .findById(hotelID)
        .select("reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding hotel " + hotelID);
                response.status = 500;
                response.message = err;
            }
            else if (!doc) {
                console.log("Error finding hotel " + hotelID);
                response.status = 404;
                response.message = { "message": "hotel ID not found" }

            };


            if (doc) {
                addReview(req, res, doc);

            } else {
                console.log("Found hotel " + hotelID);
                res

                    .status(response.status)
                    .json(response.message);

            }
        });
};
module.exports.reviewsUpdateOne = function (req, res) {

    var hotelID = req.params.hotelID;
    var reviewID = req.params.reviewID;
    console.log('PUT reviewID ' + reviewID +
        ' for hotelID ' + hotelID);

    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec(function (err, thishotel) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!thishotel) {
                console.log("hotel ID not found", id);
                response.status = 404;
                response.message = {
                    "message": "hotel ID not found " + id
                };
            } else {
                // get review and edit
                thisReview = thishotel.reviews.id(reviewID);
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
                // now check for an error and save
                if (response.status !== 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisReview.username = req.body.username;
                    thisReview.text = req.body.text;
                    thisReview.stars = parseInt(req.body.stars);
                    thishotel.save(function (err, updatedhotel) {
                        if (err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json();
                        }

                    }

                    )
                };
            }
        });
}

module.exports.reviewsDeleteOne = function(req, res) {

    var hotelID = req.params.hotelID;
    var reviewID = req.params.reviewID;
    console.log('PUT reviewID ' + reviewID +
                ' for hotelID ' + hotelID);
 
    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec(function(err, thishotel) {
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!thishotel) {
            console.log("hotel ID not found", id);
            response.status = 404;
            response.message = {
                "message" : "hotel ID not found " + id
            };
        } else {
        // get review and edit
        thisReview = thishotel.reviews.id(reviewID);
         if (!thisReview) {
            response.status = 404;
            response.message = {
                "message" : "Review ID not found " + reviewId
        };
    }
    // now check for an error and save
        if (response.status !== 200) {
            res
                .status(response.status)
                .json(response.message);
        } else {
            thishotel.reviews.id(reviewID).remove();
            thishotel.save(function(err, updatedhotel) {
                if (err) {
                   res
                       .status(500)
                       .json(err);
             } else {
                res
                .status(204)
                .json();
            }
        
    }
   
        )};
      }
    });
}
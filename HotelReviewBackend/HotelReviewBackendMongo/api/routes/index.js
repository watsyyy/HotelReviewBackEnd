var express = require('express');
var router = express.Router();

var hotelsController = 
    require ('../controllers/hotels.controllers.js');

var reviewsController = 
    require('../controllers/reviews.controllers.js');

router
    .route('/hotels')
    .get(hotelsController.hotelsGetAll)
    .post(hotelsController.hotelsAddOne);

router
    .route('/hotels/:hotelID')
    .get(hotelsController.hotelsGetOne)
    .put(hotelsController.hotelsUpdateOne)
    .delete(hotelsController.hotelsDeleteOne);


router
    .route('/hotels/:hotelID/reviews')
    .get(reviewsController.reviewsGetAll)
    .post(reviewsController.reviewsAddOne);

    

router
    .route('/hotels/:hotelID/reviews/:reviewID')
    .get(reviewsController.reviewsGetOne)
    .put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);

    module.exports = router
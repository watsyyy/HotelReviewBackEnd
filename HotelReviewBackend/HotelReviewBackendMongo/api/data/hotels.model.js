var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema ({
    funny : Number,
    useful : Number,
    cool : Number
});

var reviewSchema = new mongoose.Schema ({
    username : String,
    votes : votesSchema,
    text : String,
    stars : Number,
    date: {
        type : Date,
        default : Date.now
    },
});

var hotelSchema = new mongoose.Schema( {
    "Name": String,
    "Location": String,
    "HotelType": String,
    "Country": String,
    "Image": String,
    "Website": String,
    "review_count": Number,
    "latitude": Number,
    "longitude": Number,
    reviews : [reviewSchema]
});

mongoose.model('Hotel', hotelSchema, 'hotel');
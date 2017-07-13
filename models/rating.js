const mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;
// Trade Schema
const RatingSchema = mongoose.Schema({
    punctuality: {
        type: Number,
        required: true
    },
    work_quality: {
        type: Number,
        required: true
    },
    responsiveness: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    reliability: {
        type: Number,
        required: true
    },
    friendliness: {
        type: Number,
        required: true
    },
    trade: {
        type: schema.Types.ObjectId, ref: 'Trade'
    },
    user: {
        type: schema.Types.ObjectId, ref: 'User'
    }
    
});

const Rating = module.exports = mongoose.model('Rating', RatingSchema);
module.exports.addRating = function(newRating, callback){
    newRating.save(callback);
}
module.exports.getTradeById = function(id, callback){
    Rating.findById(id, callback);
}

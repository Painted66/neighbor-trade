const mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;
// Trade Schema
const TradeSchema = mongoose.Schema({
    trade_offer_title: {
        type: String,
        required: true
    },
    trade_offer_description: {
        type: String,
        required: true
    },
    trade_offer_categorie: {
        type: String,
        required: true
    },
    trade_offer_tags: {
        type: [String]
    },
    trade_offer_recipient: {
        type: schema.Types.ObjectId, ref: 'User'
    },
    trade_offer_rated: {
        type: Boolean,
        required: true
    },
    trade_demand_title: {
        type: String,
        required: true
    },
    trade_demand_description: {
        type: String,
        required: true
    },
    trade_demand_categorie: {
        type: String,
        required: true
    },
    trade_demand_tags: {
        type: [String]
    },
    trade_demand_recipient: {
        type: schema.Types.ObjectId, ref: 'User'
    },
    trade_demand_rated: {
        type: Boolean,
        required: true
    },
    trade_deadline: {
        type: Date,
        required: true
    },
    trade_min_rating: {
        type: String,
        required: true
    },
    trade_latitude: {
        type: Number,
        required: true
    },
    trade_longitude: {
        type: Number,
        required: true
    },
    trade_max_distance: {
        type: String,
        required: true
    },
    trade_status: {
        type: String,
        required: true
    }
});

const Trade = module.exports = mongoose.model('Trade', TradeSchema);

module.exports.getTradeById = function(id, callback){
    Trade.findById(id, callback);
}

module.exports.addTrade = function(newTrade, callback){
	console.log(newTrade);
    newTrade.save(callback);
}

module.exports.deleteTradeByID =  function (id, callback) {
    Trade.findByIdAndRemove(id, callback);
}

module.exports.updateTradeByID = function ( Trade, callback) {
    Trade.save(callback);
}
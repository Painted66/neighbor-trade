const mongoose = require('mongoose');
const config = require('../config/database');

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
        type: String
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
        type: String
    },
    trade_deadline: {
        type: Date,
        required: true
    },
    trade_min_rating: {
        type: String,
        required: true
    },
    trade_location: {
        type: String,
        required: true
    },
    trade_max_distance: {
        type: String,
        required: true
    }
});

const Trade = module.exports = mongoose.model('Trade', TradeSchema);

module.exports.getTradeById = function(id, callback){
    Trade.findById(id, callback);
}

module.exports.addTrade = function(newTrade, callback){
    newTrade.save(callback);
}
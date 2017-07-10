const express = require('express');
const router = express.Router();

const Trade = require('../models/trade');

//Add new Trad offer
router.post('/new-trade', (req, res, next) => {
    let newTrade = new Trade({
        trade_offer_title: req.body.trade_offer_title,
        trade_offer_description: req.body.trade_offer_description,
        trade_offer_categorie: req.body.trade_offer_categorie,
        trade_offer_tags: req.body.trade_offer_tags,
        trade_offer_recipient: req.body.trade_offer_recipient,
        trade_demand_title: req.body.trade_demand_title,
        trade_demand_description: req.body.trade_demand_description,
        trade_demand_categorie: req.body.trade_demand_categorie,
        trade_demand_tags: req.body.trade_demand_tags,
        trade_demand_recipient: req.body.trade_demand_recipient,
        trade_deadline: req.body.trade_deadline,
        trade_min_rating: req.body.trade_min_rating,
        trade_latitude: req.body.trade_latitude,
        trade_longitude: req.body.trade_longitude,
        trade_max_distance: req.body.trade_max_distance,
        trade_status: "searching"
    });

    Trade.addTrade(newTrade, (err, trade) => {
        if(err){
            res.json({success: false, msg:'Failed to add a new Trade Offer'});
        } else {
            res.json({success: true, msg:'The new Trade is now listed'});
        }
    });
});


router.delete('/delete-trade/:id', (req, res, next) => {
    var id = req.params.id;
    Trade.deleteTradeByID(id, (err, trade) => {
        if(err){
            res.json({success: false, msg:'Failed to delete the trade'});
        } else {
            res.json({success: true, msg:'The Trade is deleted'});
        }
    });
});

router.put ('/update-trade/:id', (req, res, next) => {
    var id = req.params.id;
    //TODO https://www.youtube.com/watch?v=5_pvYIbyZlU

    Trade.updateTradeByID(updatedTrade , (err) => {
        if(err){
            res.json({success: false, msg:'Failed to update the trade'});
        } else {
            res.json({success: true, msg:'The Trade is updated'});
        }
    });
});

module.exports = router;
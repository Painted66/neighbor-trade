const express = require('express');
const router = express.Router();

const Trade = require('../models/trade');
const Rating = require('../models/rating');

//Add new Trad offer
router.post('/new-trade', (req, res, next) => {
	console.log("in post method");
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
	console.log("created new Trade");
	console.log(newTrade);
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
        if (err) {
            res.json({success: false, msg: 'Failed to delete the trade'});
        } else {
            res.json({success: true, msg: 'The Trade is deleted'});
        }
    });
});

router.post('/rate-trade', (req, res, next) => {
console.log(req.body.user);
    let newRate = new Rating({
        punctuality: req.body.punctuality,
    	work_quality: req.body.work_quality,
    	responsiveness: req.body.responsiveness,
    	duration: req.body.duration,
    	reliability: req.body.reliability,
    	friendliness: req.body.friendliness,
    	trade: req.body.trade,
    	user: req.body.user
    });
	console.log("created new Rating");
	console.log(newRate);
    Rating.addRating(newRate, (err, rate) => {
        if(err){
        	console.log("EEERRROORRRR"+err);
            res.json({success: false, msg:'Failed to add a new Trade Offer'});
        } else {
            res.json({success: true, msg:'Rating was successful'});
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

router.get('/dashboard/:id', (req, res, next) => {
	var userID = req.params.id;
	Trade.find({trade_demand_recipient: userID}).populate('trade_offer_recipient').populate('trade_demand_recipient').exec(function(err, trade){
    	if(err){
    		res.json({success: false, trades: err});
    	}else{
    		if(!trade){
    			res.json({success: false, trades: 'no trade found'});
    		}else{
    			res.json({success: true, trades: trade});
    		}
    	}
    });
});

router.get('/trade-view/:tradeID', (req, res, next) => {
	var tradeID = req.params.tradeID;
	Trade.find({_id: tradeID}, function(err, trade){
    	if(err){
    		res.json({success: false, trades: err});
    	}else{
    		if(!trade){
    			res.json({success: false, trades: 'no trade found'});
    		}else{
    			res.json({success: true, trades: trade});
    		}
    	}
    });
});

router.get('/rating/:tradeID', (req, res, next) => {
	var tradeID = req.params.tradeID;
	Trade.find({_id: tradeID}, function(err, trade){
    	if(err){
    		res.json({success: false, trades: err});
    	}else{
    		if(!trade){
    			res.json({success: false, trades: 'no trade found'});
    		}else{
    			res.json({success: true, trades: trade});
    		}
    	}
    });
});

router.post('/trades', (req, res, next) => {
	var offer_title = req.body;
	console.log(offer_title);
	Trade.find(offer_title, function(err, trade){
    	if(err){
    		res.json({success: false, trades: err});
    	}else{
    		if(!trade){
    			res.json({success: false, trades: 'no trade found'});
    		}else{
    			res.json({success: true, trades: trade});
    		}
    	}
    });
});

module.exports = router;
  	import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute} from '@angular/router';
import {FilterPipe} from '../../filter.pipe';
import {IStarRatingOnRatingChangeEven} from "angular-star-rating/src/star-rating-struct";

@Component({
  selector: 'app-rate-trade',
  templateUrl: './rate-trade.component.html',
  styleUrls: ['./rate-trade.component.css']
})
export class RateTradeComponent implements OnInit {
	
	private id;
	private userIDToBeRated;
  	trades: JSON;
  	tmpRoute;
  	
  punctuality: Number;
  quality: Number;
  responsiveness: Number;
  duration: Number;
  reliability: Number;
  friendliness: Number;
  
  constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
  		this.tmpRoute = activatedRoute;
   }

  ngOnInit() {
  	this.tmpRoute.params.subscribe(params => {
  		this.id = params["trade_id"];
		this.userIDToBeRated = params["user_id"];
  		this.dbService.getTradeByTradeID(this.id).subscribe(data => {
			  if(data.success){
				this.trades = data.trades;
			  } else {
			  }
			});
  		});
  }
  
  onRegisterSubmit(trade_id:String){
  		var createRating = false;
		const rating = {
			punctuality: this.punctuality,
			work_quality: this.quality,
			responsiveness: this.responsiveness,
			duration: this.duration,
			reliability: this.reliability,
			friendliness: this.friendliness,
			trade: trade_id,
			user: this.userIDToBeRated
		}
		var currentTrade = this.trades[0];
		console.log("currentTrade.trade_demand_recipient: "+currentTrade.trade_demand_recipient);
		console.log("this.userIDToBeRated: "+this.userIDToBeRated);
		if(currentTrade.trade_demand_recipient === this.userIDToBeRated){
			currentTrade.trade_offer_rated = true;
			createRating=true;
		}
		console.log("SEECOONED");
		console.log("currentTrade.trade_offer_recipient: "+currentTrade.trade_offer_recipient);
		console.log("this.userIDToBeRated: "+this.userIDToBeRated);
		if(currentTrade.trade_offer_recipient === this.userIDToBeRated){
			currentTrade.trade_demand_rated = true;
			createRating=true;
		}
		console.log("current Trade: "+currentTrade);
		if(createRating){
			this.dbService.createNewRating(rating).subscribe(data => {
				if(data.success){
					this.dbService.updateTrade(trade_id, currentTrade).subscribe(data => {
						  if(data.success){
							window.location.href = "/dashboard";
						  } else {
							console.log(data);
						  }
					  });
				} else {
				}
			});
		}
		
    }
  
  onPunctualityRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.punctuality = $event.rating;
  };
  
  onQualityRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.quality = $event.rating;
  };
  
  onResponsivenessRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.responsiveness = $event.rating;
  };
  
  onDurationRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.duration = $event.rating;
  };
  
  onReliabilityRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.reliability = $event.rating;
  };
  
  onFriendlinessRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    this.friendliness = $event.rating;
  };


}

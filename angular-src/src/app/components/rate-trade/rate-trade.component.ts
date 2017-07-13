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
  		this.id = params["id"];
  		this.dbService.getTradeByTradeID(this.id).subscribe(data => {
			  if(data.success){
				this.trades = data.trades;
			  } else {
				
			  }
			});
  		});
  }
  
  onRegisterSubmit(trade_id:String, user_id:String){
		const rating = {
			punctuality: this.punctuality,
			work_quality: this.quality,
			responsiveness: this.responsiveness,
			duration: this.duration,
			reliability: this.reliability,
			friendliness: this.friendliness,
			trade: trade_id,
			user: user_id
		}
		
		this.dbService.createNewRating(rating).subscribe(data => {
		  if(data.success){
			location.reload();
		} else {
		}
		});
		
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

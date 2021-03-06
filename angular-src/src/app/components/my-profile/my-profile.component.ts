import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {DbService} from '../../services/db.service';
import {IStarRatingOnRatingChangeEven} from "angular-star-rating/src/star-rating-struct";

import {FlashMessagesService} from 'angular2-flash-messages';
import {FilterPipe} from '../../filter.pipe';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user:Object;
  userID:String;
  trades:Object;
  ratings:Object;
  
  punctuality=0;
  work_quality=0;
  responsiveness=0;
  duration=0;
  reliability=0;
  friendliness=0;
  ratingCount=0;

  punctualityString:String;
  work_qualityString:String;
  responsivenessString:String;
  durationString:String;
  reliabilityString:String;
  friendlinessString:String;
  ratingCountString:String;

  constructor(private authService:AuthService,
      		private dbService: DbService, 
  			private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
          this.user = profile.user;
          this.userID = profile.user._id;
          this.dbService.getRatingsByUserID(this.userID).subscribe(data => {
			  if(data.success){
				this.ratings = data.ratings;
				console.log(data.ratings);
				var i: any;
				for(i in data.ratings){
					console.log(data.ratings[this.ratingCount]);
					this.punctuality += data.ratings[this.ratingCount].punctuality;
					this.work_quality += data.ratings[this.ratingCount].work_quality;
					this.responsiveness += data.ratings[this.ratingCount].responsiveness;
					this.duration += data.ratings[this.ratingCount].duration;
					this.reliability += data.ratings[this.ratingCount].reliability;
					this.friendliness += data.ratings[this.ratingCount].friendliness;
					this.ratingCount += 1;
				}
				
				this.punctuality = this.punctuality/this.ratingCount;
				this.work_quality = this.work_quality/this.ratingCount;
				this.responsiveness = this.responsiveness/this.ratingCount;
				this.duration = this.duration/this.ratingCount;
				this.reliability  = this.reliability/this.ratingCount;
				this.friendliness  = this.friendliness/this.ratingCount;

				this.punctualityString = this.punctuality.toString();
				this.work_qualityString = this.work_quality.toString();
				this.responsivenessString = this.responsiveness.toString();
				this.durationString = this.duration.toString();
				this.reliabilityString = this.reliability.toString();
				this.friendlinessString = this.friendliness.toString();
			  } else {
			  }
			});
        },
        err => {
          console.log(err);
          return false;
    });
    
    
  }


}


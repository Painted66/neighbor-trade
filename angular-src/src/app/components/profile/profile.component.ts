import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  overallRating = 0;

  	tmpRoute;
  	
  constructor(private authService:AuthService,
      		private dbService: DbService, 
  			private router:Router,
      		private activatedRoute: ActivatedRoute) 
      		{ 
      		
  				this.tmpRoute = activatedRoute;
      		}

  ngOnInit() {
  	this.tmpRoute.params.subscribe(params => {
  		this.userID = params["id"];
  		this.dbService.getUserByID(this.userID).subscribe(userData =>{
  			if(userData.success){
  				this.user = userData.users[0];
  				this.dbService.getUserRatingsByUserID(this.userID).subscribe(data => {
  			
			  if(data.success){
				this.ratings = data.ratings;
				console.log('Ratings: '+data.ratings);
				var i: any;
				for(i in data.ratings){
					console.log(data.ratings[this.ratingCount]);
					this.punctuality += data.ratings[this.ratingCount].punctuality;
					this.work_quality += data.ratings[this.ratingCount].work_quality;
					this.responsiveness += data.ratings[this.ratingCount].responsiveness;
					this.duration += data.ratings[this.ratingCount].duration;
					this.reliability += data.ratings[this.ratingCount].reliability;
					this.friendliness += data.ratings[this.ratingCount].friendliness;
					this.user = data.ratings[this.ratingCount].user;
					this.ratingCount += 1;
					
				}
				this.punctuality = this.punctuality/this.ratingCount;
				this.work_quality = this.work_quality/this.ratingCount;
				this.responsiveness = this.responsiveness/this.ratingCount;
				this.duration = this.duration/this.ratingCount;
				this.reliability  = this.reliability/this.ratingCount;
				this.friendliness  = this.friendliness/this.ratingCount;
				
				this.overallRating = (this.punctuality 
									+ this.work_quality 
									+ this.responsiveness 
									+ this.duration 
									+ this.reliability 
									+ this.friendliness)/6;
			  } else {
			  }
			});
  			}else{
  			
  			}
  		});
  	});
    
    
  }


}


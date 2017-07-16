  	import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute} from '@angular/router';
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-trade-view',
  templateUrl: './trade-view.component.html',
  styleUrls: ['./trade-view.component.css']
})
export class TradeViewComponent implements OnInit {
	
	private id;
  	trades: JSON;
  	address: JSON;
  	tmpRoute;
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
				this.dbService.getAddress(this.trades[0].trade_latitude, this.trades[0].trade_longitude).subscribe(adressData => {
				
					  this.address = adressData;
				  });  

			  } else {
				
			  }
			});
  		});
  		
  }
  
  goToRateTrade(id: string){
	const user = localStorage.getItem('user');
	var userJson = JSON.parse(user);
	var userIDToBeRated = -1;
	if(this.trades[0]){
		if(this.trades[0].trade_offer_recipient&&
			this.trades[0].trade_offer_recipient._id === userJson.id && 
			this.trades[0].trade_demand_recipient._id !== userJson.id &&
			this.trades[0].trade_demand_recipient._id !== undefined){
			userIDToBeRated = this.trades[0].trade_demand_recipient._id;
		}else{
			if(this.trades[0].trade_demand_recipient){
			if(this.trades[0].trade_offer_recipient&&
			this.trades[0].trade_demand_recipient._id === userJson.id && 
			this.trades[0].trade_offer_recipient._id !== userJson.id &&
			this.trades[0].trade_offer_recipient._id !== undefined){
				userIDToBeRated = this.trades[0].trade_offer_recipient._id;
			}}
		}
		if(userIDToBeRated!=-1){
  			this.router.navigate(["/rate-trade", id, userIDToBeRated]);
		}
	}
  }

  deleteTrade(id: string){
	  this.dbService.deleteOneTrade(id).subscribe(data => {
		  if(data.success){
			  location.reload();
			  this.flashMessage.show('Your trade is now deleted', {cssClass: 'alert-success', timeout: 3000});
		  } else {
			  this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
		  }
	  });
  }
  
	applyForTrade(id: string){
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(user.id);
		var currentTrade = this.trades[0];
		currentTrade.trade_status = 'applied';
		currentTrade.trade_offer_recipient = user.id;
		console.log(currentTrade);
		  this.dbService.updateTrade(id, currentTrade).subscribe(data => {
			  if(data.success){
				window.location.href = "/dashboard";
			  } else {
				console.log(data);
			  }
		  });
	}
	acceptTradePartner(id: string){
		const user = JSON.parse(localStorage.getItem('user'));
		var currentTrade = this.trades[0];
		currentTrade.trade_status = 'accepted';
		  this.dbService.updateTrade(id, currentTrade).subscribe(data => {
			  if(data.success){
				window.location.href = "/dashboard";
			  } else {
				console.log(data);
			  }
		  });
	}
	denyTradePartner(id: string){
		const user = JSON.parse(localStorage.getItem('user'));
		var currentTrade = this.trades[0];
		currentTrade.trade_status = 'searching';
		currentTrade.trade_offer_recipient = null;
		  this.dbService.updateTrade(id, currentTrade).subscribe(data => {
			  if(data.success){
				window.location.href = "/dashboard";
			  } else {
				console.log(data);
			  }
		  });
	}
  isMyTrade(){
	const user = localStorage.getItem('user');
	var userJson = JSON.parse(user);
	return userJson.id== this.trades[0].trade_demand_recipient._id && this.trades[0].trade_status === 'searching';
  }
  isOpenForMe(){
  	var isOpen = false;
  	if(this.trades[0]){
  		isOpen = this.trades[0].trade_status === 'searching';
  	}
  	return isOpen && !this.isMyTrade();
  }
  
  isMyTradeAppliedFor(){
	const user = localStorage.getItem('user');
  	var isOpen = false;
  	var isMyTrade = false;
	var userJson = JSON.parse(user);
  	if(this.trades[0]){
  		isOpen = this.trades[0].trade_status === 'applied';
  		isMyTrade = userJson.id== this.trades[0].trade_demand_recipient._id;
  	}
  	return isOpen && isMyTrade;
  }
  
  isRatable(){
	const user = localStorage.getItem('user');
	var isOfferRecipient = false;
	var isDemandRecipient = false;
  	var isAccepted = false;
  	var isMyTrade = false;
  	var isRated = false;
	var userJson = JSON.parse(user);
  	if(this.trades[0]){
		var isOfferRecipient = userJson.id === this.trades[0].trade_demand_recipient._id;
		var isDemandRecipient = false;
		if(this.trades[0].trade_offer_recipient){
			isDemandRecipient = userJson.id === this.trades[0].trade_offer_recipient._id;
		}
  		isAccepted = this.trades[0].trade_status === 'accepted';
  		isMyTrade = isOfferRecipient || isDemandRecipient;
  		if(isOfferRecipient){
  			isRated = this.trades[0].trade_demand_rated;
  		}
  		if(isDemandRecipient){
  			isRated = this.trades[0].trade_offer_rated;
  		}
  	}
  	return isAccepted && isMyTrade && !isRated;
  }
	goToUserProfile(id: string){
		console.log(id);
		this.router.navigate(["/profile", id]);
	}
	getUserName(user){
		if(user){
			if(user.username) return user.username;
		}
		return '';
	}
	getUserID(user){
	if(user){
			if(user._id) return user._id;
		}
		return '';
	}
	getAdress(adress){
		if(adress){
			if(adress.results[1])return adress.results[1].formatted_address;
		}
		return'';
	}

	}

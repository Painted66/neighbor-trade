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
			  } else {
				
			  }
			});
  		});
  }
  
  goToRateTrade(id: string){
  	this.router.navigate(["/rate-trade", id]);
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
				  location.reload();
			  } else {
				console.log(data);
			  }
		  });
	}

  isMyTrade(){
	const user = localStorage.getItem('user');
	var userJson = JSON.parse(user);
	return userJson.id== this.trades[0].trade_demand_recipient && this.trades[0].trade_status === 'searching';
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
  		isMyTrade = userJson.id== this.trades[0].trade_demand_recipient
  	}
  	return isOpen && isMyTrade;
  }
  
}

  	import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-trades',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
	userID: Object;
  	trades: JSON;
	constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router
  ) { }

	ngOnInit() {

		this.userID = JSON.parse(localStorage.getItem('user')).id;

		// Create new Trade
		this.dbService.getTradesByUserID(this.userID).subscribe(data => {
		  if(data.success){
			this.trades = data.trades;

		  } else {

		  }
		});
	}
		goToTradeDetails(id: string){
		this.router.navigate(["/trade-view", id]);
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
	
	isMyTradeAppliedFor(trade){
		const user = localStorage.getItem('user');
		var isOpen = false;
		var isMyTrade = false;
		var userJson = JSON.parse(user);
		if(trade){
			isOpen = trade.trade_status === 'applied';
			isMyTrade = userJson.id== trade.trade_demand_recipient._id;
		}
		return isOpen && isMyTrade;
	}
	acceptTradePartner(id: string, currentTrade){
		const user = JSON.parse(localStorage.getItem('user'));
		currentTrade.trade_status = 'accepted';
		  this.dbService.updateTrade(id, currentTrade).subscribe(data => {
			  if(data.success){
				window.location.href = "/dashboard";
			  } else {
				console.log(data);
			  }
		  });
	}
	denyTradePartner(id: string, currentTrade){
		const user = JSON.parse(localStorage.getItem('user'));
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

}
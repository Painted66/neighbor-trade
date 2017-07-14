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

  isMyTrade(){
	const user = localStorage.getItem('user');
	var userJson = JSON.parse(user);
	return userJson.id== this.trades[0].trade_demand_recipient;
  }
}

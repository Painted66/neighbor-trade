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

}

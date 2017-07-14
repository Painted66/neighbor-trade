//import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

import {  Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

import {IStarRatingOnRatingChangeEven} from "angular-star-rating/src/star-rating-struct";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {
	trades: Object;
	trade_offer_title: String; 
	trade_offer_categorie: String;
	trade_demand_title: String;
	trade_demand_categorie: String;
	trade_demand_tags: String;
	trade_offer_tags: String;

  constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone) { }

  ngOnInit() {
  }

	goToTradeDetails(id: string){
  	this.router.navigate(["/trade-view", id]);
  }
	onSearchClicked(){
		this.dbService.findTrades(this.trade_offer_title, 
								this.trade_offer_categorie, 
								this.trade_demand_title, 
								this.trade_demand_categorie, 
								this.trade_demand_tags, 
								this.trade_offer_tags).subscribe(data => {
		  if(data.success){
		  	
      			this.trades = data.trades;
		  } else {  
		  	this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
		}
		});
	}
}

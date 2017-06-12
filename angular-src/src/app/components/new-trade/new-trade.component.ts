import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.css']
})
export class NewTradeComponent implements OnInit {
  trade_offer_title: String;
  trade_offer_description: String;
  trade_offer_categorie: String;
  trade_offer_tags: String;
  trade_demand_title: String;
  trade_demand_description: String;
  trade_demand_categorie: String;
  trade_demand_tags: String;
  trade_deadline: String;
  trade_min_rating: Number;
  trade_location: String;
  trade_max_distance: Number;

  constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const trade = {
      trade_offer_title: this.trade_offer_title,
      trade_offer_description: this.trade_offer_description,
      trade_offer_categorie: this.trade_offer_categorie,
      trade_offer_tags: this.trade_offer_tags,
      trade_demand_title: this.trade_demand_title,
      trade_demand_description: this.trade_demand_description,
      trade_demand_categorie: this.trade_demand_categorie,
      trade_demand_tags: this.trade_demand_tags,
      trade_deadline: this.trade_deadline,
      trade_min_rating: this.trade_min_rating,
      trade_location: this.trade_location,
      trade_max_distance: this.trade_max_distance,
      trade_demand_recipient: "sajdfklasdf123123"   //has to be changed to get the user Id od the user who creates the trade offer
    }

    //Required Fields
    if(!this.validateService.validateNewTrade(trade)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // Create new Trade
    this.dbService.createNewTrade(trade).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Your trade offer is now listed', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}

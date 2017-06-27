import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateNewTrade(trade){
    if(trade.trade_offer_title == undefined || trade.trade_offer_description == undefined ||  trade.trade_offer_categorie == undefined ||  trade.trade_offer_tags == undefined ||  trade.trade_demand_title == undefined ||  trade.trade_demand_description == undefined ||  trade.trade_demand_categorie == undefined ||  trade.trade_demand_tags == undefined ||  trade.trade_deadline == undefined ||  trade.trade_min_rating == undefined ||  trade.trade_latitude == undefined ||   trade.trade_longitude == undefined ||  trade.trade_max_distance == undefined){
      return false;
    } else {
      return true;
    }
  }
}

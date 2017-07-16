import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, term: any): any {
  	if(term === undefined) return values;
  	var demand_user_id = '';
  	var offer_user_id = '';
  	var tradeOfferRecipient = true;
  	if(term.demand_user_id) demand_user_id = term.demand_user_id;
  	
  	if(term.offer_user_id) offer_user_id = term.offer_user_id;
  	if(values){
		return values.filter(function(value){
			if(value.trade_offer_recipient){
  				tradeOfferRecipient = value.trade_offer_recipient._id.includes(offer_user_id);
  			}
  			return value.trade_status == term.trade_status &&
  					value.trade_demand_recipient._id.includes(demand_user_id) &&
  					tradeOfferRecipient;
  		});
	}else{
		return false;
	}
    
  }

}

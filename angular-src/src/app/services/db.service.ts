import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DbService {
  trade: any;

  constructor(private http:Http) { }

  deleteOneTrade(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:3000/trades/delete-trade/'+id,{headers: headers})
        .map(res => res.json());
  }

	createNewTrade(trade){
		console.log(trade);
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:3000/trades/new-trade', trade,{headers: headers})
			.map(res => res.json());
	}
	
	createNewRating(rating){
		console.log(rating);
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:3000/trades/rate-trade', rating,{headers: headers})
			.map(res => res.json());
	}

	getTradesByUserID(userID){
		let headers = new Headers();
		headers.append('Content-Type','application/json');

		return this.http.get('http://localhost:3000/trades/dashboard/'+userID, {headers: headers})
			.map(res => res.json());
	}

	getTradeByTradeID(tradeID){
		let headers = new Headers();
		headers.append('Content-Type','application/json');

		return this.http.get('http://localhost:3000/trades/trade-view/'+tradeID, {headers: headers})
			.map(res => res.json());
	}
	
	findTrades(offerTitle, trade_offer_categorie, trade_demand_title, trade_demand_categorie, trade_demand_tags, trade_offer_tags){
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		let query = {};
		if(offerTitle!==undefined && offerTitle!=="")query['trade_offer_title'] = offerTitle;
		if(trade_offer_categorie!==undefined && trade_offer_categorie!=="")query['trade_offer_categorie'] = trade_offer_categorie;
		if(trade_demand_title!==undefined && trade_demand_title!=="")query['trade_demand_title'] = trade_demand_title;
		if(trade_demand_categorie!==undefined && trade_demand_categorie!=="")query['trade_demand_categorie'] = trade_demand_categorie;
		if(trade_demand_tags!==undefined && trade_demand_tags!=="")query['trade_demand_tags'] = trade_demand_tags;
		if(trade_offer_tags!==undefined && trade_offer_tags!=="")query['trade_offer_tags'] = trade_offer_tags;
		
		return this.http.post('http://localhost:3000/trades/trades/', query, {headers: headers})
			.map(res => res.json());
	}

}

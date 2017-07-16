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
  updateTrade(id, updatedTrade) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(updatedTrade);
    return this.http.put('http://localhost:3000/trades/update-trade/'+id, updatedTrade, {headers: headers})
        .map(res => res.json());
  }
	createNewTrade(trade){
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
	
	getRatingsByUserID(userID){
		console.log(userID);
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.get('http://localhost:3000/trades/my-profile/'+userID, {headers: headers})
			.map(res => res.json());
	}
	
	getUserRatingsByUserID(userID){
		console.log(userID);
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.get('http://localhost:3000/trades/profile/'+userID, {headers: headers})
			.map(res => res.json());
	}
	
	getUserByID(userID){
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.get('http://localhost:3000/users/profile/'+userID, {headers: headers})
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

	getAddress(lat,lng) {
		var call = ('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true');
		return this.http.get(call)
            .map(res => res.json());
	}

}

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DbService {
  trade: any;

  constructor(private http:Http) { }

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
  	
  
}

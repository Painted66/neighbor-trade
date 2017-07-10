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

  deleteOneTrade(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:3000/trades/delete-trade/'+id,{headers: headers})
        .map(res => res.json());
  }
}

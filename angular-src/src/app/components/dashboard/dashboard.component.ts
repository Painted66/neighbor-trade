  	import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-trades',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
	userID: Object;
  	trades: JSON;
	constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router
  ) { }

  ngOnInit() {
    
    this.userID = JSON.parse(localStorage.getItem('user')).id;
    
    // Create new Trade
    this.dbService.getTradesByUserID(this.userID).subscribe(data => {
      if(data.success){
      	this.trades = data.trades;
      	
      } else {
      	
      }
    });
  }
  goToTradeDetails(id: string){
  	this.router.navigate(["/trade-view", id]);
  }
  


}
//import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {DbService} from '../../services/db.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

import {  Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

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
  user:Object;
  currentStep = 1;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
      private validateService: ValidateService,
      private dbService: DbService,
      private flashMessage:FlashMessagesService,
      private router: Router,

      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
           });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onRegisterSubmit(){
    var user_id = JSON.parse(localStorage.getItem('user')).id;
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
      trade_latitude: this.latitude,
      trade_longitude: this.longitude,
      trade_max_distance: this.trade_max_distance,
      trade_demand_recipient: user_id
    }

    //Required Fields
    if(!this.validateService.validateNewTrade(trade)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // Create new Trade
    this.dbService.createNewTrade(trade).subscribe(data => {
      if(data.success){
        location.reload();
        this.flashMessage.show('Your trade offer is now listed', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  nextStep(){
    var current = document.getElementById("Step"+this.currentStep);
    this.currentStep++;
    var next = document.getElementById("Step"+this.currentStep);
    next.style.display = "inline";
    current.style.display = "none";
  }

  preStep(){
    var current = document.getElementById("Step"+this.currentStep);
    this.currentStep--;
    var next = document.getElementById("Step"+this.currentStep);
    next.style.display = "inline";
    current.style.display = "none";
  }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { DbService } from '../../services/db.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
var NewTradeComponent = (function () {
    function NewTradeComponent(validateService, dbService, flashMessage, router, mapsAPILoader, ngZone) {
        var _this = this;
        this.validateService = validateService;
        this.dbService = dbService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.currentStep = 1;
        this.onRatingChange = function ($event) {
            _this.trade_min_rating = $event.rating;
        };
    }
    NewTradeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    NewTradeComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    NewTradeComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user_id = JSON.parse(localStorage.getItem('user')).id;
        var trade = {
            trade_offer_title: this.trade_offer_title,
            trade_offer_description: this.trade_offer_description,
            trade_offer_categorie: this.trade_offer_categorie,
            trade_offer_tags: this.trade_offer_tags.split(","),
            trade_demand_title: this.trade_demand_title,
            trade_demand_description: this.trade_demand_description,
            trade_demand_categorie: this.trade_demand_categorie,
            trade_demand_tags: this.trade_demand_tags.split(","),
            trade_deadline: this.trade_deadline,
            trade_min_rating: this.trade_min_rating,
            trade_latitude: this.latitude,
            trade_longitude: this.longitude,
            trade_max_distance: this.trade_max_distance,
            trade_demand_recipient: user_id,
            trade_offer_rated: false,
            trade_demand_rated: false
        };
        //Required Fields
        if (!this.validateService.validateNewTrade(trade)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Create new Trade
        this.dbService.createNewTrade(trade).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('Your trade offer is now listed', { cssClass: 'alert-success', timeout: 3000 });
                window.location.href = "/dashboard";
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    NewTradeComponent.prototype.nextStep = function () {
        var current = document.getElementById("Step" + this.currentStep);
        this.currentStep++;
        var next = document.getElementById("Step" + this.currentStep);
        next.style.display = "inline";
        current.style.display = "none";
    };
    NewTradeComponent.prototype.preStep = function () {
        var current = document.getElementById("Step" + this.currentStep);
        this.currentStep--;
        var next = document.getElementById("Step" + this.currentStep);
        next.style.display = "inline";
        current.style.display = "none";
    };
    return NewTradeComponent;
}());
__decorate([
    ViewChild("search"),
    __metadata("design:type", ElementRef)
], NewTradeComponent.prototype, "searchElementRef", void 0);
NewTradeComponent = __decorate([
    Component({
        selector: 'app-new-trade',
        templateUrl: './new-trade.component.html',
        styleUrls: ['./new-trade.component.css']
    }),
    __metadata("design:paramtypes", [ValidateService,
        DbService,
        FlashMessagesService,
        Router,
        MapsAPILoader,
        NgZone])
], NewTradeComponent);
export { NewTradeComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/new-trade/new-trade.component.js.map
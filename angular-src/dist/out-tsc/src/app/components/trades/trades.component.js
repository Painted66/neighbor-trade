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
import { Component, NgZone } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
var TradesComponent = (function () {
    function TradesComponent(validateService, dbService, flashMessage, router, mapsAPILoader, ngZone) {
        this.validateService = validateService;
        this.dbService = dbService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
    }
    TradesComponent.prototype.ngOnInit = function () {
    };
    TradesComponent.prototype.goToTradeDetails = function (id) {
        this.router.navigate(["/trade-view", id]);
    };
    TradesComponent.prototype.onSearchClicked = function () {
        var _this = this;
        this.dbService.findTrades(this.trade_offer_title, this.trade_offer_categorie, this.trade_demand_title, this.trade_demand_categorie, this.trade_demand_tags, this.trade_offer_tags).subscribe(function (data) {
            if (data.success) {
                console.log(data);
                _this.trades = data.trades;
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    TradesComponent.prototype.goToUserProfile = function (user) {
        if (user) {
            var id = user._id;
            console.log('USER ID: ' + id);
            this.router.navigate(["/profile", id]);
        }
    };
    TradesComponent.prototype.getUserName = function (user) {
        if (user)
            return user.username;
        return "";
    };
    return TradesComponent;
}());
TradesComponent = __decorate([
    Component({
        selector: 'app-trades',
        templateUrl: './trades.component.html',
        styleUrls: ['./trades.component.css']
    }),
    __metadata("design:paramtypes", [ValidateService,
        DbService,
        FlashMessagesService,
        Router,
        MapsAPILoader,
        NgZone])
], TradesComponent);
export { TradesComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/trades/trades.component.js.map
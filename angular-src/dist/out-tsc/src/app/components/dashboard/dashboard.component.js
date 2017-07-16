var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { DbService } from '../../services/db.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
var DashboardComponent = (function () {
    function DashboardComponent(validateService, dbService, flashMessage, router) {
        this.validateService = validateService;
        this.dbService = dbService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userID = JSON.parse(localStorage.getItem('user')).id;
        // Create new Trade
        this.dbService.getTradesByUserID(this.userID).subscribe(function (data) {
            if (data.success) {
                _this.trades = data.trades;
            }
            else {
            }
        });
    };
    DashboardComponent.prototype.goToTradeDetails = function (id) {
        this.router.navigate(["/trade-view", id]);
    };
    DashboardComponent.prototype.goToUserProfile = function (id) {
        console.log(id);
        this.router.navigate(["/profile", id]);
    };
    DashboardComponent.prototype.getUserName = function (user) {
        if (user) {
            if (user.username)
                return user.username;
        }
        return '';
    };
    DashboardComponent.prototype.isMyTradeAppliedFor = function (trade) {
        var user = localStorage.getItem('user');
        var isOpen = false;
        var isMyTrade = false;
        var userJson = JSON.parse(user);
        if (trade) {
            isOpen = trade.trade_status === 'applied';
            isMyTrade = userJson.id == trade.trade_demand_recipient._id;
        }
        return isOpen && isMyTrade;
    };
    DashboardComponent.prototype.acceptTradePartner = function (id, currentTrade) {
        var user = JSON.parse(localStorage.getItem('user'));
        currentTrade.trade_status = 'accepted';
        this.dbService.updateTrade(id, currentTrade).subscribe(function (data) {
            if (data.success) {
                window.location.href = "/dashboard";
            }
            else {
                console.log(data);
            }
        });
    };
    DashboardComponent.prototype.denyTradePartner = function (id, currentTrade) {
        var user = JSON.parse(localStorage.getItem('user'));
        currentTrade.trade_status = 'searching';
        currentTrade.trade_offer_recipient = null;
        this.dbService.updateTrade(id, currentTrade).subscribe(function (data) {
            if (data.success) {
                window.location.href = "/dashboard";
            }
            else {
                console.log(data);
            }
        });
    };
    DashboardComponent.prototype.getAdress = function (trade) {
        /*if(trade){
            this.dbService.getAddress(trade.trade_latitude, trade.trade_longitude).subscribe(adressData => {
                
                          return adressData.results[1].formatted_address;
            });
            return 'Nothing';
        }*/
        return 'No Trade';
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Component({
        selector: 'app-trades',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css'],
    }),
    __metadata("design:paramtypes", [ValidateService,
        DbService,
        FlashMessagesService,
        Router])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/dashboard/dashboard.component.js.map
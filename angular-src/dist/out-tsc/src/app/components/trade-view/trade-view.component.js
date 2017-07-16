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
import { Router, ActivatedRoute } from '@angular/router';
var TradeViewComponent = (function () {
    function TradeViewComponent(validateService, dbService, flashMessage, router, activatedRoute) {
        this.validateService = validateService;
        this.dbService = dbService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.tmpRoute = activatedRoute;
    }
    TradeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tmpRoute.params.subscribe(function (params) {
            _this.id = params["id"];
            _this.dbService.getTradeByTradeID(_this.id).subscribe(function (data) {
                if (data.success) {
                    _this.trades = data.trades;
                }
                else {
                }
            });
        });
        this.dbService.getAddress("48.3583779", "10.7914009").subscribe(function (data) {
            _this.address = data;
        });
    };
    TradeViewComponent.prototype.goToRateTrade = function (id) {
        var user = localStorage.getItem('user');
        var userJson = JSON.parse(user);
        var userIDToBeRated = -1;
        if (this.trades[0]) {
            if (this.trades[0].trade_offer_recipient === userJson.id &&
                this.trades[0].trade_demand_recipient !== userJson.id &&
                this.trades[0].trade_demand_recipient !== undefined) {
                userIDToBeRated = this.trades[0].trade_demand_recipient;
            }
            else {
                if (this.trades[0].trade_demand_recipient === userJson.id &&
                    this.trades[0].trade_offer_recipient !== userJson.id &&
                    this.trades[0].trade_offer_recipient !== undefined) {
                    userIDToBeRated = this.trades[0].trade_offer_recipient;
                }
            }
            if (userIDToBeRated != -1) {
                this.router.navigate(["/rate-trade", id, userIDToBeRated]);
            }
        }
    };
    TradeViewComponent.prototype.deleteTrade = function (id) {
        var _this = this;
        this.dbService.deleteOneTrade(id).subscribe(function (data) {
            if (data.success) {
                location.reload();
                _this.flashMessage.show('Your trade is now deleted', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    TradeViewComponent.prototype.applyForTrade = function (id) {
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.id);
        var currentTrade = this.trades[0];
        currentTrade.trade_status = 'applied';
        currentTrade.trade_offer_recipient = user.id;
        console.log(currentTrade);
        this.dbService.updateTrade(id, currentTrade).subscribe(function (data) {
            if (data.success) {
                window.location.href = "/dashboard";
            }
            else {
                console.log(data);
            }
        });
    };
    TradeViewComponent.prototype.acceptTradePartner = function (id) {
        var user = JSON.parse(localStorage.getItem('user'));
        var currentTrade = this.trades[0];
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
    TradeViewComponent.prototype.denyTradePartner = function (id) {
        var user = JSON.parse(localStorage.getItem('user'));
        var currentTrade = this.trades[0];
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
    TradeViewComponent.prototype.isMyTrade = function () {
        var user = localStorage.getItem('user');
        var userJson = JSON.parse(user);
        return userJson.id == this.trades[0].trade_demand_recipient && this.trades[0].trade_status === 'searching';
    };
    TradeViewComponent.prototype.isOpenForMe = function () {
        var isOpen = false;
        if (this.trades[0]) {
            isOpen = this.trades[0].trade_status === 'searching';
        }
        return isOpen && !this.isMyTrade();
    };
    TradeViewComponent.prototype.isMyTradeAppliedFor = function () {
        var user = localStorage.getItem('user');
        var isOpen = false;
        var isMyTrade = false;
        var userJson = JSON.parse(user);
        if (this.trades[0]) {
            isOpen = this.trades[0].trade_status === 'applied';
            isMyTrade = userJson.id == this.trades[0].trade_demand_recipient;
        }
        return isOpen && isMyTrade;
    };
    TradeViewComponent.prototype.isRatable = function () {
        var user = localStorage.getItem('user');
        var isOfferRecipient = false;
        var isDemandRecipient = false;
        var isAccepted = false;
        var isMyTrade = false;
        var isRated = false;
        var userJson = JSON.parse(user);
        if (this.trades[0]) {
            var isOfferRecipient = userJson.id === this.trades[0].trade_demand_recipient;
            var isDemandRecipient = userJson.id === this.trades[0].trade_offer_recipient;
            isAccepted = this.trades[0].trade_status === 'accepted';
            isMyTrade = isOfferRecipient || isDemandRecipient;
            if (isOfferRecipient) {
                isRated = this.trades[0].trade_demand_rated;
            }
            if (isDemandRecipient) {
                isRated = this.trades[0].trade_offer_rated;
            }
        }
        return isAccepted && isMyTrade && !isRated;
    };
    TradeViewComponent.prototype.goToUserProfile = function (id) {
        console.log(id);
        this.router.navigate(["/profile", id]);
    };
    TradeViewComponent.prototype.getUserName = function (user) {
        if (user) {
            if (user.username)
                return user.username;
        }
        return '';
    };
    return TradeViewComponent;
}());
TradeViewComponent = __decorate([
    Component({
        selector: 'app-trade-view',
        templateUrl: './trade-view.component.html',
        styleUrls: ['./trade-view.component.css']
    }),
    __metadata("design:paramtypes", [ValidateService,
        DbService,
        FlashMessagesService,
        Router,
        ActivatedRoute])
], TradeViewComponent);
export { TradeViewComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/trade-view/trade-view.component.js.map
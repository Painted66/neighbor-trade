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
var RateTradeComponent = (function () {
    function RateTradeComponent(validateService, dbService, flashMessage, router, activatedRoute) {
        var _this = this;
        this.validateService = validateService;
        this.dbService = dbService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.onPunctualityRatingChange = function ($event) {
            _this.punctuality = $event.rating;
        };
        this.onQualityRatingChange = function ($event) {
            _this.quality = $event.rating;
        };
        this.onResponsivenessRatingChange = function ($event) {
            _this.responsiveness = $event.rating;
        };
        this.onDurationRatingChange = function ($event) {
            _this.duration = $event.rating;
        };
        this.onReliabilityRatingChange = function ($event) {
            _this.reliability = $event.rating;
        };
        this.onFriendlinessRatingChange = function ($event) {
            _this.friendliness = $event.rating;
        };
        this.tmpRoute = activatedRoute;
    }
    RateTradeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tmpRoute.params.subscribe(function (params) {
            _this.id = params["trade_id"];
            _this.userIDToBeRated = params["user_id"];
            _this.dbService.getTradeByTradeID(_this.id).subscribe(function (data) {
                if (data.success) {
                    _this.trades = data.trades;
                }
                else {
                }
            });
        });
    };
    RateTradeComponent.prototype.onRegisterSubmit = function (trade_id) {
        var _this = this;
        var createRating = false;
        var rating = {
            punctuality: this.punctuality,
            work_quality: this.quality,
            responsiveness: this.responsiveness,
            duration: this.duration,
            reliability: this.reliability,
            friendliness: this.friendliness,
            trade: trade_id,
            user: this.userIDToBeRated
        };
        var currentTrade = this.trades[0];
        console.log("currentTrade.trade_demand_recipient: " + currentTrade.trade_demand_recipient);
        console.log("this.userIDToBeRated: " + this.userIDToBeRated);
        if (currentTrade.trade_demand_recipient === this.userIDToBeRated) {
            currentTrade.trade_offer_rated = true;
            createRating = true;
        }
        console.log("SEECOONED");
        console.log("currentTrade.trade_offer_recipient: " + currentTrade.trade_offer_recipient);
        console.log("this.userIDToBeRated: " + this.userIDToBeRated);
        if (currentTrade.trade_offer_recipient === this.userIDToBeRated) {
            currentTrade.trade_demand_rated = true;
            createRating = true;
        }
        console.log("current Trade: " + currentTrade);
        if (createRating) {
            this.dbService.createNewRating(rating).subscribe(function (data) {
                if (data.success) {
                    _this.dbService.updateTrade(trade_id, currentTrade).subscribe(function (data) {
                        if (data.success) {
                            window.location.href = "/dashboard";
                        }
                        else {
                            console.log(data);
                        }
                    });
                }
                else {
                }
            });
        }
    };
    return RateTradeComponent;
}());
RateTradeComponent = __decorate([
    Component({
        selector: 'app-rate-trade',
        templateUrl: './rate-trade.component.html',
        styleUrls: ['./rate-trade.component.css']
    }),
    __metadata("design:paramtypes", [ValidateService,
        DbService,
        FlashMessagesService,
        Router,
        ActivatedRoute])
], RateTradeComponent);
export { RateTradeComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/rate-trade/rate-trade.component.js.map
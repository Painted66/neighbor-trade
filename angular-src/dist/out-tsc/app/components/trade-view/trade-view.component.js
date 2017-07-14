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
    };
    TradeViewComponent.prototype.goToRateTrade = function (id) {
        this.router.navigate(["/rate-trade", id]);
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
    TradeViewComponent.prototype.isMyTrade = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
        }, function (err) {
            console.log(err);
            return false;
        });
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
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/app/components/trade-view/trade-view.component.js.map
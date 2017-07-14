var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
var DbService = (function () {
    function DbService(http) {
        this.http = http;
    }
    DbService.prototype.deleteOneTrade = function (id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:3000/trades/delete-trade/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.createNewTrade = function (trade) {
        console.log(trade);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/trades/new-trade', trade, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.createNewRating = function (rating) {
        console.log(rating);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/trades/rate-trade', rating, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.getTradesByUserID = function (userID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/trades/dashboard/' + userID, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.getTradeByTradeID = function (tradeID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/trades/trade-view/' + tradeID, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.findTrades = function (offerTitle, trade_offer_categorie, trade_demand_title, trade_demand_categorie, trade_demand_tags, trade_offer_tags) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var query = {};
        if (offerTitle !== undefined && offerTitle !== "")
            query['trade_offer_title'] = offerTitle;
        if (trade_offer_categorie !== undefined && trade_offer_categorie !== "")
            query['trade_offer_categorie'] = trade_offer_categorie;
        if (trade_demand_title !== undefined && trade_demand_title !== "")
            query['trade_demand_title'] = trade_demand_title;
        if (trade_demand_categorie !== undefined && trade_demand_categorie !== "")
            query['trade_demand_categorie'] = trade_demand_categorie;
        if (trade_demand_tags !== undefined && trade_demand_tags !== "")
            query['trade_demand_tags'] = trade_demand_tags;
        if (trade_offer_tags !== undefined && trade_offer_tags !== "")
            query['trade_offer_tags'] = trade_offer_tags;
        return this.http.post('http://localhost:3000/trades/trades/', query, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return DbService;
}());
DbService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DbService);
export { DbService };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/services/db.service.js.map
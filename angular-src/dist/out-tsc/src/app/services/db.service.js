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
    DbService.prototype.createNewTrade = function (trade) {
        console.log(trade);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/trades/new-trade', trade, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DbService.prototype.deleteOneTrade = function (id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:3000/trades/delete-trade/' + id, { headers: headers })
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
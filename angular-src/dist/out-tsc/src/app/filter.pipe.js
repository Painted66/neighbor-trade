var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (values, term) {
        if (term === undefined)
            return values;
        var demand_user_id = '';
        var offer_user_id = '';
        var tradeOfferRecipient = true;
        if (term.demand_user_id)
            demand_user_id = term.demand_user_id;
        if (term.offer_user_id)
            offer_user_id = term.offer_user_id;
        if (values) {
            return values.filter(function (value) {
                if (value.trade_offer_recipient) {
                    tradeOfferRecipient = value.trade_offer_recipient._id.includes(offer_user_id);
                }
                return value.trade_status == term.trade_status &&
                    value.trade_demand_recipient._id.includes(demand_user_id) &&
                    tradeOfferRecipient;
            });
        }
        else {
            return false;
        }
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    Pipe({
        name: 'filter'
    })
], FilterPipe);
export { FilterPipe };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/filter.pipe.js.map
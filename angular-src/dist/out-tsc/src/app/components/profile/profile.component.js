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
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
var ProfileComponent = (function () {
    function ProfileComponent(authService, dbService, router, activatedRoute) {
        this.authService = authService;
        this.dbService = dbService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.punctuality = 0;
        this.work_quality = 0;
        this.responsiveness = 0;
        this.duration = 0;
        this.reliability = 0;
        this.friendliness = 0;
        this.ratingCount = 0;
        this.overallRating = 0;
        this.tmpRoute = activatedRoute;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tmpRoute.params.subscribe(function (params) {
            _this.userID = params["id"];
            _this.dbService.getUserByID(_this.userID).subscribe(function (userData) {
                if (userData.success) {
                    _this.user = userData.users[0];
                    _this.dbService.getUserRatingsByUserID(_this.userID).subscribe(function (data) {
                        if (data.success) {
                            _this.ratings = data.ratings;
                            console.log('Ratings: ' + data.ratings);
                            var i;
                            for (i in data.ratings) {
                                console.log(data.ratings[_this.ratingCount]);
                                _this.punctuality += data.ratings[_this.ratingCount].punctuality;
                                _this.work_quality += data.ratings[_this.ratingCount].work_quality;
                                _this.responsiveness += data.ratings[_this.ratingCount].responsiveness;
                                _this.duration += data.ratings[_this.ratingCount].duration;
                                _this.reliability += data.ratings[_this.ratingCount].reliability;
                                _this.friendliness += data.ratings[_this.ratingCount].friendliness;
                                _this.user = data.ratings[_this.ratingCount].user;
                                _this.ratingCount += 1;
                            }
                            _this.punctuality = _this.punctuality / _this.ratingCount;
                            _this.work_quality = _this.work_quality / _this.ratingCount;
                            _this.responsiveness = _this.responsiveness / _this.ratingCount;
                            _this.duration = _this.duration / _this.ratingCount;
                            _this.reliability = _this.reliability / _this.ratingCount;
                            _this.friendliness = _this.friendliness / _this.ratingCount;
                            _this.overallRating = (_this.punctuality
                                + _this.work_quality
                                + _this.responsiveness
                                + _this.duration
                                + _this.reliability
                                + _this.friendliness) / 6;
                            _this.overallRatingString = _this.overallRating.toString();
                        }
                        else {
                        }
                    });
                }
                else {
                }
            });
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    __metadata("design:paramtypes", [AuthService,
        DbService,
        Router,
        ActivatedRoute])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/components/profile/profile.component.js.map
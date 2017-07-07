var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ValidateService } from './services/validate.service';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AgmCoreModule } from "angular2-google-maps/core";
import { StarRatingModule } from 'angular-star-rating';
import { CollapseDirective } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TradesComponent } from './components/trades/trades.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { NewTradeComponent } from './components/new-trade/new-trade.component';
import { RateTradeComponent } from './components/rate-trade/rate-trade.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
var appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'private-policy', component: PrivacyPolicyComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'trades', component: TradesComponent, canActivate: [AuthGuard] },
    { path: 'search-result', component: SearchResultsComponent, canActivate: [AuthGuard] },
    { path: 'new-trade', component: NewTradeComponent, canActivate: [AuthGuard] },
    { path: 'rate-trade', component: RateTradeComponent, canActivate: [AuthGuard] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavbarComponent,
            LoginComponent,
            RegisterComponent,
            HomeComponent,
            DashboardComponent,
            ProfileComponent,
            TradesComponent,
            FooterComponent,
            SearchResultsComponent,
            NewTradeComponent,
            RateTradeComponent,
            ImpressumComponent,
            PrivacyPolicyComponent,
            CollapseDirective
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            RouterModule.forRoot(appRoutes),
            FlashMessagesModule,
            AgmCoreModule.forRoot({
                apiKey: "AIzaSyD40UovXGbrmaYjaCHxqBY7r5wEo_CRQxY",
                libraries: ["places"]
            }),
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            StarRatingModule
        ],
        providers: [ValidateService, AuthService, AuthGuard, DbService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=C:/Users/Malte/Dokumente/neighbor-trade/angular-src/src/src/app/app.module.js.map
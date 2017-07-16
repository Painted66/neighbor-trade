import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ValidateService} from './services/validate.service';
import {DbService} from './services/db.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { AgmCoreModule } from "angular2-google-maps/core";
import { StarRatingModule } from 'angular-star-rating';
import { CollapseDirective } from 'ngx-bootstrap'


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
import { FilterPipe } from './filter.pipe';
import { TradeViewComponent } from './components/trade-view/trade-view.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';




const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'impressum', component: ImpressumComponent},
  {path:'private-policy', component: PrivacyPolicyComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'my-profile', component: MyProfileComponent, canActivate:[AuthGuard]},
  {path:'my-profile/:id', component: MyProfileComponent, canActivate:[AuthGuard]},
  {path:'trades', component: TradesComponent, canActivate:[AuthGuard]},
  {path:'search-result', component: SearchResultsComponent, canActivate:[AuthGuard]},
  {path:'new-trade', component: NewTradeComponent, canActivate:[AuthGuard]},
  {path:'rate-trade/:trade_id/:user_id', component: RateTradeComponent, canActivate:[AuthGuard]},
  {path:'trade-view/:id', component: TradeViewComponent, canActivate:[AuthGuard]},
  {path:'profile/:id', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
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
    CollapseDirective,
    FilterPipe,
    TradeViewComponent,
    MyProfileComponent,
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
export class AppModule { }

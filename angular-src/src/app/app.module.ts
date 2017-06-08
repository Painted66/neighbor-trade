import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

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

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';



const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'impressum', component: ImpressumComponent},
  {path:'private-policy', component: PrivacyPolicyComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'trades', component: TradesComponent, canActivate:[AuthGuard]},
  {path:'search-result', component: SearchResultsComponent, canActivate:[AuthGuard]},
  {path:'new-trade', component: NewTradeComponent, canActivate:[AuthGuard]},
  {path:'rate-trade', component: RateTradeComponent, canActivate:[AuthGuard]}
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
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

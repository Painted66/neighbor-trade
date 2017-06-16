import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  password: String;
  name: String;
  usernameR: String;
  email: String;
  passwordR: String;

  constructor(
      private validateService: ValidateService,
      private authService:AuthService,
      private router:Router,
      private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password,
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

  onRegisterSubmit(){
    console.log("hi");
    const user = {
      name: this.name,
      email: this.email,
      username: this.usernameR,
      password: this.passwordR
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}

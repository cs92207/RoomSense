import { Component, OnInit } from '@angular/core';
import { AuthService, SignInResponse } from '../services/auth.service';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: false
})
export class SignInPage implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private authService:AuthService, private router:Router, private popUpService:PopupService, private loading:LoadingService) { }

  ngOnInit() {
  }

  async signIn() {
    this.loading.showPopup();
    let res:SignInResponse = await this.authService.signIn(this.email, this.password);
    this.loading.closePopup();
    if(res.success)
      this.router.navigate(['home']);
    else 
      this.popUpService.showAlert(res.message);
  }

  forgotPassword() {
    this.router.navigate(["forgot-password"]);
  }

}

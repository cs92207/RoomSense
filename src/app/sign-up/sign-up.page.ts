import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false
})
export class SignUpPage implements OnInit {

  email:string = "";
  password:string = "";
  passwordRepeat:string = "";
  check1:boolean = false;

  constructor(private authService:AuthService, private popUpService:PopupService, private loading:LoadingService) { }

  ngOnInit() {  }

  async signUp() {
    if(this.email == "" || this.password == "" || this.passwordRepeat == "") {
      this.popUpService.showAlert("Bitte fülle alle Felder aus.");
      return;
    }
    if(!this.check1) {
      this.popUpService.showAlert("Bitte akzeptiere unsere AGB und Datenschutzerklärung.");
      return;
    }
    if(this.password != this.passwordRepeat) {
      this.popUpService.showAlert("Die Passwörter stimmen nicht überein.");
      return;
    }
    this.loading.showPopup();
    let res = await this.authService.signUp(this.email, this.password, this.passwordRepeat);
    this.loading.closePopup();
    this.popUpService.showAlert(res);
  }

}

import { Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.page.html',
  styleUrls: ['./email-confirmed.page.scss'],
  standalone: false
})
export class EmailConfirmedPage implements OnInit {

  constructor(private popUpService:PopupService, private router:Router) { }

  ngOnInit() {
    this.popUpService.showAlert("Email-Adresse bestätigt. Du kannst dich nun anmelden.")
    this.router.navigate(['sign-in']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
  standalone: false
})
export class CookieBannerComponent  implements OnInit {

  showBanner: boolean = true;
  showDetails: boolean = false;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    console.log("as")
    await this.storage.create();
    const consent = await this.storage.get('cookieConsentTeamSwap');
    this.showBanner = consent !== 'accepted';
  }

  async acceptCookies() {
    await this.storage.set('cookieConsentTeamSwap', 'accepted');
    this.showBanner = false;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

}

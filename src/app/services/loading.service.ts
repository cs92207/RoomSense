import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  async showPopup(message: string = 'Bitte warten...') {
    if (this.loading) {
      await this.closePopup(); // Falls bereits ein Popup existiert, schließen
    }

    this.loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent', // Alternativ: 'dots', 'lines', 'bubbles', etc.
      duration: 5 // Läuft unendlich, bis es manuell geschlossen wird
    });

    await this.loading.present();
  }

  // Methode zum Schließen des Popups
  async closePopup() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

}

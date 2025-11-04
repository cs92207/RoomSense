import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private alertController: AlertController) {}

  async showAlert(message: string, header: string = 'Info', buttonText: string = 'OK'): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [buttonText]
    });
    await alert.present();
  }
  
}

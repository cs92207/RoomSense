import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private toastController: ToastController) {}

  async showAlert(
    message: string, 
    duration: number = 3000,
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    color: string = 'primary'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color
    });

    await toast.present();
  }
}

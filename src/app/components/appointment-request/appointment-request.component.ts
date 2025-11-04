import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentRequest } from 'src/app/models/appointment-request';
import { Customer } from 'src/app/models/customer';
import { AppointmentRequestDetailsComponent } from '../appointment-request-details/appointment-request-details.component';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.scss'],
  standalone: false
})
export class AppointmentRequestComponent {

  @Input() appointmentRequest:AppointmentRequest = new AppointmentRequest;
  @Input() customer:Customer = new Customer;

  constructor(
    private modalController:ModalController
  ) {  }

  async openCreateProjectModal() {
    const modal = await this.modalController.create({
      component: AppointmentRequestDetailsComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        customer: this.customer,
        appointmentRequest: this.appointmentRequest
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'created' && data) {
      // this.update();
    }
  }

}

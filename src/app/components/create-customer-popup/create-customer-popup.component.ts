import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-customer-popup',
  templateUrl: './create-customer-popup.component.html',
  styleUrls: ['./create-customer-popup.component.scss'],
  standalone: false
})
export class CreateCustomerPopupComponent {

  newName: string = '';

  @Input() user:User = new User;

  constructor(private loading:LoadingService, private customerService:CustomersService, private modalController: ModalController) {  }

  async createCustomer() {
    this.loading.showPopup();
    await this.customerService.createCustomer(this.user.id, this.newName);
    this.loading.closePopup();
    const name = this.newName;
    this.newName = "";
    this.modalController.dismiss(name, 'created');
  }

  cancel() {
    this.newName = '';
    this.modalController.dismiss(null, 'cancelled');
  }

}

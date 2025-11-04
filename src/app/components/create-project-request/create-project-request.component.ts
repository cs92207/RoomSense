import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-project-request',
  templateUrl: './create-project-request.component.html',
  styleUrls: ['./create-project-request.component.scss'],
  standalone: false
})
export class CreateProjectRequestComponent {

  newName: string = '';
  newDescription:string = "";
  newPrice:number = 0;
  newDeadline:Date = new Date;

  @Input() customer:Customer = new Customer;

  constructor(private loading:LoadingService, private customerService:CustomersService, private modalController: ModalController) {  }

  async createCustomer() {
    this.loading.showPopup();
    this.customerService.createProjectRequest(this.newName, this.newDescription, this.customer.id, this.newPrice, this.newDeadline);
    this.loading.closePopup();
    this.modalController.dismiss();
  }

  cancel() {
    this.newName = '';
    this.modalController.dismiss(null, 'cancelled');
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone: false
})
export class CreateProjectComponent {

  newName: string = '';
  newDescription:string = "";
  newPrice:number = 0;
  newDeadline:Date = new Date;

  @Input() customer:Customer = new Customer;

  constructor(private loading:LoadingService, private customerService:CustomersService, private modalController: ModalController) {  }

  async createCustomer() {
    this.loading.showPopup();
    await this.customerService.createProject(this.newName, this.newDescription, this.customer.id, this.newPrice, this.newDeadline);
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

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customer } from 'src/app/models/customer';
import { Project } from 'src/app/models/project';
import { AppointmentRequestsService } from 'src/app/services/appointment-request.service';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-appointment-request',
  templateUrl: './create-appointment-request.component.html',
  styleUrls: ['./create-appointment-request.component.scss'],
  standalone: false
})
export class CreateAppointmentRequestComponent  implements OnInit {

  @Input() customer:Customer = new Customer;
  @Input() owner:number = 0;

  newTopic:string = "";
  newPlattform:string = "";
  option1Date:Date = new Date;
  option1Time:string = "";
  option2Date:Date = new Date;
  option2Time:string = "";
  option3Date:Date = new Date;
  option3Time:string = "";

  currentProject:Project = new Project;

  projectsFromCustomer:Project[] = []

  constructor(
    private appointmentRequestService:AppointmentRequestsService,
    private modalController:ModalController,
    private loading:LoadingService,
    private customerService:CustomersService
  ) { }

  async ngOnInit() {
    this.loading.showPopup();
    this.projectsFromCustomer = await this.customerService.getAllCustomerProjects(this.customer.id);
    this.loading.closePopup();
  }

  async createAppointment() {
    this.loading.showPopup();
    await this.appointmentRequestService.createRequest({
      id: -1,
      customer: this.customer.id,
      topic: this.newTopic,
      plattform: this.newPlattform,
      option1_date: this.option1Date.toString(),
      option1_time: this.option1Time,
      option2_date: this.option2Date.toString(),
      option2_time: this.option2Time,
      option3_date: this.option3Date.toString(),
      option3_time: this.option3Time,
      owner: this.owner,
      audio_path: "",
      created_at: "",
      updated_at: "",
      project: this.currentProject.id,
      status: 'pending'
    });
    this.modalController.dismiss(null, 'created');
  }

  cancel() {
    this.modalController.dismiss(null, 'cancelled');
  }

}

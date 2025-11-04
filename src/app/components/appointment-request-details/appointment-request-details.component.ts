import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentRequest } from 'src/app/models/appointment-request';
import { Customer } from 'src/app/models/customer';
import { AppointmentRequestsService } from 'src/app/services/appointment-request.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-appointment-request-details',
  templateUrl: './appointment-request-details.component.html',
  styleUrls: ['./appointment-request-details.component.scss'],
  standalone: false
})
export class AppointmentRequestDetailsComponent  implements OnInit {

  @Input() customer:Customer = new Customer;
  @Input() appointmentRequest:AppointmentRequest = new AppointmentRequest;

  constructor(
    private appointmentRequestService:AppointmentRequestsService
  ) { }

  ngOnInit() {}

  async acceptOption(option:number) {
    await this.appointmentRequestService.acceptRequest(this.appointmentRequest.id, option);
  }

  convertDate(dateString:string) : string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 weil Monate 0-basiert
    const year = date.getFullYear();

    const formattedDate = `${day}:${month}:${year}`;
    return formattedDate;
  }

}

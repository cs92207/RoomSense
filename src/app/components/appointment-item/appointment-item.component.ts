import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Project } from 'src/app/models/project';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss'],
  standalone: false
})
export class AppointmentItemComponent {

  @Input() appointment:Appointment = new Appointment;

  constructor(
    private router:Router
  ) {  }

  isPast() : boolean {
    const date:Date = new Date(this.appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (date < today);
  }

  goToAppointmentDetails() {
    this.router.navigate(['appointment-details', this.appointment.id]);
  }

}

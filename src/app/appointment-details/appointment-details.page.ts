import { Component, OnInit, Query } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { AppointmentsService } from '../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../models/appointment';
import { Project } from '../models/project';
import { CustomersService } from '../services/customers.service';
import { ModalController } from '@ionic/angular';
import { CreateAppointmentScriptComponent } from '../components/create-appointment-script/create-appointment-script.component';
import { AppointmentScript } from '../models/appointment-script';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
  standalone: false
})
export class AppointmentDetailsPage implements OnInit {

  appointmentID:number = 0;
  appointment:Appointment = new Appointment;
  project:Project = new Project;

  appointmentScripts:AppointmentScript[] = [];

  isLoading:boolean = false;

  constructor(
    private loading:LoadingService,
    private appointmentService:AppointmentsService,
    private customerService:CustomersService,
    private router:Router,
    private route:ActivatedRoute,
    private modalController:ModalController
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.loading.showPopup();
    let paID = this.route.snapshot.paramMap.get("id");
    if(paID != null) {
      this.appointmentID = parseInt(paID);
    }
    this.appointment = await this.appointmentService.getAppointmentById(this.appointmentID);
    this.project = await this.customerService.getProjectByID(this.appointment.project);
    this.appointmentScripts = await this.appointmentService.getScriptsFromAppointment(this.appointment.id);
    this.loading.closePopup();
    this.isLoading = false;
  }

  async archiveAppointment() {
    this.loading.showPopup();
    await this.appointmentService.deleteAppointment(this.appointment.id);
    location.href = "customer-details/" + this.appointment.customer;
    this.loading.closePopup();
  }

  isPast() : boolean {
    const date:Date = new Date(this.appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (date < today);
  }

  async update() {
    this.loading.showPopup();
    this.appointmentScripts = await this.appointmentService.getScriptsFromAppointment(this.appointment.id);
    this.loading.closePopup();
  }

  async openCreateAppointmentScript() {
      const modal = await this.modalController.create({
        component: CreateAppointmentScriptComponent,
        cssClass: 'adaptable-modal',
        showBackdrop: true,
        backdropDismiss: true,
        componentProps: {
          appointment: this.appointment
        }
      });
      await modal.present();
      const { data, role } = await modal.onDidDismiss();
      this.update();
    }

}

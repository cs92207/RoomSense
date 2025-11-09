import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentScript } from '../models/appointment-script';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../services/appointment.service';
import { Project } from '../models/project';
import { CustomersService } from '../services/customers.service';
import { LoadingService } from '../services/loading.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-appointment-script-details',
  templateUrl: './appointment-script-details.page.html',
  styleUrls: ['./appointment-script-details.page.scss'],
  standalone: false
})
export class AppointmentScriptDetailsPage implements OnInit {

  appointmentScriptID:number = 0;

  appointment:Appointment = new Appointment;
  appointmentScript:AppointmentScript = new AppointmentScript;
  project:Project = new Project;

  isLoading:boolean = false;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private appointmentService:AppointmentsService,
    private customerService:CustomersService,
    private loading:LoadingService,
    private popUp:PopupService
  ) { }

  async ngOnInit() {
    this.loading.showPopup();
    this.isLoading = true;
    let paID = this.route.snapshot.paramMap.get("id");
    if(paID != null) {
      this.appointmentScriptID = parseInt(paID);
    }
    this.appointmentScript = await this.appointmentService.getAppointmentScriptById(this.appointmentScriptID);
    this.appointment = await this.appointmentService.getAppointmentById(this.appointmentScript.appointment);
    this.project = await this.customerService.getProjectByID(this.appointment.project);
    this.loading.closePopup();
    this.isLoading = false;
  }

  async deleteAppointmentScript() {
    this.loading.showPopup();
    await this.appointmentService.deleteAppointmentScript(this.appointmentScript.id);
    location.href = "appointment-details/" + this.appointment.id;
    this.loading.closePopup();
  }

  async filterTodosToScript() {
    this.loading.showPopup();
    await this.customerService.translateTextToTodos(this.appointmentScript.script, this.project.id, 0, this.project.customer);
    // location.href = "project-details/" + this.project.id + "/" + this.project.customer;
    this.popUp.showAlert("Todos hinzugefügt");
    this.loading.closePopup();
  }

}

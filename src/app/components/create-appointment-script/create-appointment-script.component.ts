import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from 'src/app/services/appointment.service';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-appointment-script',
  templateUrl: './create-appointment-script.component.html',
  styleUrls: ['./create-appointment-script.component.scss'],
  standalone: false
})
export class CreateAppointmentScriptComponent  implements OnInit {

  @Input() appointment:Appointment = new Appointment;

  selectedFile?: File;
  scriptText:string = "";

  isLoading:boolean = false;

  constructor(
    private loading:LoadingService,
    private customerService:CustomersService,
    private appointmentService:AppointmentsService,
    private modalController:ModalController
  ) { }

  async ngOnInit() {
    console.log(this.appointment);
  }

  async onFileSelected(event: any) {
    this.isLoading = true;
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Datei ausgewählt:', file.name);
    }
    this.scriptText = await this.customerService.translateAudioToScript(this.selectedFile!);
    console.log(this.scriptText);
    this.isLoading = false;
  }

  async createAppointmentScript() {
    this.loading.showPopup();
    console.log(this.scriptText);
    await this.appointmentService.createAppointmentScript(this.appointment.id, this.selectedFile, this.scriptText);
    this.modalController.dismiss();
    this.loading.closePopup();
  }

}

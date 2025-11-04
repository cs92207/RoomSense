import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentScript } from 'src/app/models/appointment-script';

@Component({
  selector: 'app-appointment-script',
  templateUrl: './appointment-script.component.html',
  styleUrls: ['./appointment-script.component.scss'],
  standalone: false
})
export class AppointmentScriptComponent  implements OnInit {

  @Input() appointmentScript:AppointmentScript = new AppointmentScript;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  getFirstScriptChars() : string {
    if(this.appointmentScript.script.length < 50) {
      return this.appointmentScript.script;
    }
    let text = "";
    for(let i = 0; i < 50; i++) {
      text += this.appointmentScript.script[i];
    }
    text += "...";
    return text;
  }

  goToAppointmentScriptDetails() {
    this.router.navigate(['appointment-script-details', this.appointmentScript.id]);
  }

}

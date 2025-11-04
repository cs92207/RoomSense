import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentScriptDetailsPageRoutingModule } from './appointment-script-details-routing.module';

import { AppointmentScriptDetailsPage } from './appointment-script-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentScriptDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [AppointmentScriptDetailsPage]
})
export class AppointmentScriptDetailsPageModule {}

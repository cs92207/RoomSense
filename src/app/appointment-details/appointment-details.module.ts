import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentDetailsPageRoutingModule } from './appointment-details-routing.module';

import { AppointmentDetailsPage } from './appointment-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [AppointmentDetailsPage]
})
export class AppointmentDetailsPageModule {}

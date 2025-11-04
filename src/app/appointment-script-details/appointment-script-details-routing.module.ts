import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentScriptDetailsPage } from './appointment-script-details.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentScriptDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentScriptDetailsPageRoutingModule {}

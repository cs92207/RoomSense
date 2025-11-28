import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadManagementPage } from './lead-management.page';

const routes: Routes = [
  {
    path: '',
    component: LeadManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadManagementPageRoutingModule {}

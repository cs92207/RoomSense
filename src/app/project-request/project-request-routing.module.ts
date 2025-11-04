import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectRequestPage } from './project-request.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRequestPageRoutingModule {}

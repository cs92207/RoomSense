import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectRequestPageRoutingModule } from './project-request-routing.module';

import { ProjectRequestPage } from './project-request.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectRequestPageRoutingModule,
    SharedModule
],
  declarations: [ProjectRequestPage]
})
export class ProjectRequestPageModule {}

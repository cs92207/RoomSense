import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadManagementPageRoutingModule } from './lead-management-routing.module';

import { LeadManagementPage } from './lead-management.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadManagementPageRoutingModule,
    SharedModule
  ],
  declarations: [LeadManagementPage]
})
export class LeadManagementPageModule {}

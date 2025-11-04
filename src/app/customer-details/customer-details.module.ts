import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDetailsPageRoutingModule } from './customer-details-routing.module';

import { CustomerDetailsPage } from './customer-details.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDetailsPageRoutingModule,
    SharedModule
],
  declarations: [CustomerDetailsPage]
})
export class CustomerDetailsPageModule {}

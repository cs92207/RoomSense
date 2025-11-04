import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailConfirmedPageRoutingModule } from './email-confirmed-routing.module';

import { EmailConfirmedPage } from './email-confirmed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailConfirmedPageRoutingModule
  ],
  declarations: [EmailConfirmedPage]
})
export class EmailConfirmedPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { ProfileButtonComponent } from '../components/profile-button/profile-button.component';
import { ProfilePopoverComponent } from '../components/profile-popover/profile-popover.component';



@NgModule({
  declarations: [
    ProfileButtonComponent,
    ProfilePopoverComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports: [
    ProfileButtonComponent,
    ProfilePopoverComponent
  ]
})
export class SharedModule { }

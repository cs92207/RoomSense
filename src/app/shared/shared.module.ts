import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileButtonComponent } from '../components/profile-button/profile-button.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { ProfilePopoverComponent } from '../components/profile-popover/profile-popover.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { ProjectComponent } from '../components/project/project.component';
import { TodoComponent } from '../components/todo/todo.component';
import { ProjectRequestComponent } from '../components/project-request/project-request.component';
import { TodoPopoverComponent } from '../components/todo-popover/todo-popover.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FooterBottomComponent } from '../components/footer-bottom/footer-bottom.component';
import { CookieBannerComponent } from '../components/cookie-banner/cookie-banner.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { CreateCustomerPopupComponent } from '../components/create-customer-popup/create-customer-popup.component';
import { CreateProjectComponent } from '../components/create-project/create-project.component';
import { CreateProjectRequestComponent } from '../components/create-project-request/create-project-request.component';
import { AppointmentItemComponent } from '../components/appointment-item/appointment-item.component';
import { AppointmentRequestComponent } from '../components/appointment-request/appointment-request.component';
import { CreateAppointmentRequestComponent } from '../components/create-appointment-request/create-appointment-request.component';
import { CreateAppointmentScriptComponent } from '../components/create-appointment-script/create-appointment-script.component';
import { AppointmentScriptComponent } from '../components/appointment-script/appointment-script.component';



@NgModule({
  declarations: [
    ProfileButtonComponent,
    ProfilePopoverComponent,
    CustomerComponent,
    ProjectComponent,
    TodoComponent,
    ProjectRequestComponent,
    TodoPopoverComponent,
    FooterComponent,
    FooterBottomComponent,
    CookieBannerComponent,
    SidebarComponent,
    CreateCustomerPopupComponent,
    CreateProjectComponent,
    CreateProjectRequestComponent,
    AppointmentItemComponent,
    AppointmentRequestComponent,
    CreateAppointmentRequestComponent,
    CreateAppointmentScriptComponent,
    AppointmentScriptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  exports: [
    ProfileButtonComponent,
    ProfilePopoverComponent,
    CustomerComponent,
    ProjectComponent,
    TodoComponent,
    ProjectRequestComponent,
    TodoPopoverComponent,
    FooterComponent,
    FooterBottomComponent,
    CookieBannerComponent,
    SidebarComponent,
    CreateProjectComponent,
    CreateProjectRequestComponent,
    AppointmentItemComponent,
    AppointmentRequestComponent,
    CreateAppointmentRequestComponent,
    CreateAppointmentScriptComponent,
    AppointmentScriptComponent
  ]
})
export class SharedModule { }

import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Project } from '../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { ProjectRequest } from '../models/project-request';
import { CreateProjectComponent } from '../components/create-project/create-project.component';
import { CreateProjectRequestComponent } from '../components/create-project-request/create-project-request.component';
import { Appointment } from '../models/appointment';
import { AppointmentRequest } from '../models/appointment-request';
import { AppointmentsService } from '../services/appointment.service';
import { AppointmentRequestsService } from '../services/appointment-request.service';
import { CreateAppointmentRequestComponent } from '../components/create-appointment-request/create-appointment-request.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
  standalone: false
})
export class CustomerDetailsPage implements OnInit {

  projects:Project[] = [];
  projectRequsts:ProjectRequest[] = [];
  customerID:string = "";
  customer:Customer = new Customer;
  isOwner:boolean = false;

  isLoading:boolean = false;

  showRequests:boolean = false;

  customerAppointments:Appointment[] = [];
  customerAppointmentRequests:AppointmentRequest[] = [];

  constructor(
    private customerService:CustomersService, 
    private router:Router, 
    private modalController:ModalController, 
    private loading:LoadingService, 
    private route:ActivatedRoute, 
    private authService:AuthService,
    private appointmentService:AppointmentsService,
    private appointmentRequestService:AppointmentRequestsService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.loading.showPopup();
    let paID = this.route.snapshot.paramMap.get("customer");
    if(paID != null) {
      this.customerID = paID;
    }
    this.projectRequsts = await this.customerService.getCustomerProjectRequests(this.customerID);
    this.customer = await this.customerService.getCustomerByID(this.customerID);
    this.projects = await this.customerService.getAllCustomerProjects(this.customerID);
    console.log(this.projects);
    let mUser:User|null = await this.authService.getCurrentUser();
    this.customerAppointments = await this.appointmentService.getAppointmentsForCustomer(this.customer.id);
    this.customerAppointmentRequests = await this.appointmentRequestService.getRequestsForCustomer(this.customer.id);

    if(mUser == null) {
      this.isOwner = false;
    } else {
      if(mUser.id == this.customer.user) {
        this.isOwner = true;
      }
    }
    this.loading.closePopup();
    this.isLoading = false;
    this.route.params.subscribe(params => {
      this.update();
    });
  }

  async openCreateProjectRequestModal() {
    const modal = await this.modalController.create({
      component: CreateProjectRequestComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        customer: this.customer
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'created' && data) {
      this.update();
    }
  }

  async openCreateAppointmentRequestModal() {
    const modal = await this.modalController.create({
      component: CreateAppointmentRequestComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        customer: this.customer,
        owner: this.isOwner ? 1 : 0
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'created' && data) {
      this.update();
    }
  }

  toggleRequests() {
    this.showRequests = !this.showRequests;
  }

  async openCreateProjectModal() {
    const modal = await this.modalController.create({
      component: CreateProjectComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        customer: this.customer
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'created' && data) {
      this.update();
    }
  }

  async update() {
    this.isLoading = true;
    this.projectRequsts = await this.customerService.getCustomerProjectRequests(this.customerID);
    this.customer = await this.customerService.getCustomerByID(this.customerID);
    this.projects = await this.customerService.getAllCustomerProjects(this.customerID);
    this.customerAppointments = await this.appointmentService.getAppointmentsForCustomer(this.customer.id);
    this.customerAppointmentRequests = await this.appointmentRequestService.getRequestsForCustomer(this.customer.id); 
    this.isLoading = false;
  }

  goToRequestProject() {
    this.router.navigate(['project-request', this.customer.id]);
  }

  goToCreateProject() {
    this.router.navigate(['create-project', this.customer.id]);
  }

}

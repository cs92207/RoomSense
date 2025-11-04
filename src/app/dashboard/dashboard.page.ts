import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { LoadingService } from '../services/loading.service';
import { Customer } from '../models/customer';
import { ModalController } from '@ionic/angular';
import { CreateCustomerPopupComponent } from '../components/create-customer-popup/create-customer-popup.component';
import { Todo } from '../models/todo';
import { Project } from '../models/project';
import { Storage } from '@ionic/storage-angular';
import { Appointment } from '../models/appointment';
import { AppointmentsService } from '../services/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  user:User = new User;
  customers:Customer[] = [];
  newName:string = "";
  isLoading:boolean = false;
  lastTodo:Todo = new Todo;
  project:Project = new Project;
  customer:Customer = new Customer;

  collapsed = false;

  tutorial:boolean = false;

  appointments:Appointment[] = [];

  constructor(
    private router:Router, 
    private authService:AuthService, 
    private customerService:CustomersService, 
    private loading:LoadingService,
    private modalController:ModalController,
    private storage:Storage,
    private appointmentService:AppointmentsService
  ) { }

  async ngOnInit() {
    this.init();
  }

  async update() {
    this.init();
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['sign-in']);
  }

  async closeTutorial() {
    this.tutorial = false;
    await this.storage.create();
    await this.storage.set("TEAM_SWAP_TUTORIAL", 1);
  }

  async init() {
    await this.storage.create();
    let teamSwapTutorial:number = await this.storage.get("TEAM_SWAP_TUTORIAL")
    if(!teamSwapTutorial || teamSwapTutorial == 0) {
      this.tutorial = true;
    }
    this.isLoading = true;
    let mUser = await this.authService.getCurrentUser();
    if(mUser == null) {
      this.router.navigate(["sign-in"]);
      return;
    }
    this.user = mUser;
    this.appointments = await this.appointmentService.getAppointmentsFromUser(this.user.id);
    this.lastTodo = await this.customerService.getLastTodoFromUser(this.user.id);
    this.project = await this.customerService.getProjectByID(this.lastTodo.project);
    this.customers = await this.customerService.getAllCustomersFromUser(this.user.id);
    this.customer = await this.customerService.getCustomerByID(this.project.customer);
    this.isLoading = false;
    console.log(this.appointments);
  }

  getCustomerByID(customerID:string) : Customer {
    let customer:Customer = new Customer;
    this.customers.forEach(element => {
      if(element.id == customerID) {
        customer = element;
      }
    });
    return customer;
  }

  goToAppointment(appointmentID:number) {
    location.href = "appointment-details/" + appointmentID;
  }

  goToProject() {
    this.router.navigate(['project-details', this.project.id, this.customer.id]);
  }

  onSidebarChange(state: boolean) {
    this.collapsed = state;
  }

  onBreakCreation() {
    this.modalController.dismiss();
  }

  getShortDescriptionFromTodo() : string {
    if(this.lastTodo.description.length <= 40) {
      return this.lastTodo.description;
    }
    let shortDescription = "";
    for(let i = 0; i < 40; i++) {
      shortDescription += this.lastTodo.description.charAt(i);
    }
    shortDescription += "...";
    return shortDescription;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateCustomerPopupComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        user: this.user
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'created' && data) {
      this.init();
    }
  }

}

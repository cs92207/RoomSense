import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CustomersService } from '../services/customers.service';
import { LoadingService } from '../services/loading.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.page.html',
  styleUrls: ['./project-request.page.scss'],
  standalone: false
})
export class ProjectRequestPage implements OnInit {

  customerID:string = "";
  customer:Customer = new Customer;
  isOwner:boolean = false;

  newName:string = "";
  newDescription:string = "";
  price:number|null = null;
  newDeadline:Date = new Date;

  constructor(private customerService:CustomersService, private popUpService:PopupService, private router:Router, private loading:LoadingService, private route:ActivatedRoute, private authService:AuthService) { }

  async ngOnInit() {
    this.loading.showPopup();
    let paID = this.route.snapshot.paramMap.get("customer");
    if(paID != null) {
      this.customerID = paID;
    }
    this.customer = await this.customerService.getCustomerByID(this.customerID);
    let mUser:User|null = await this.authService.getCurrentUser();
    if(mUser == null) {
      this.isOwner = false;
    } else {
      if(mUser.id == this.customer.user) {
        this.isOwner = true;
      }
    }
    if(this.isOwner) {
      this.router.navigate(["create-project", this.customer.id]);
    }
    this.loading.closePopup();
  }

  async createProjectRequest() {
    if(this.price == null) {
      this.popUpService.showAlert("Please make a price proposal");
      return
    }
    this.loading.showPopup();
    await this.customerService.createProjectRequest(this.newName, this.newDescription, this.customer.id, this.price!, this.newDeadline);
    this.loading.closePopup();
    this.router.navigate(['customer-details', this.customer.id]);
  }

}

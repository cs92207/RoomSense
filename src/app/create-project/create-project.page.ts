import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Customer } from '../models/customer';
import { CustomersService } from '../services/customers.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
  standalone: false
})
export class CreateProjectPage implements OnInit {

  customerID:string = "";
  customer:Customer = new Customer;
  isOwner:boolean = false;

  newName:string = "";
  newDescription:string = "";
  newPrice:number|null = null;

  constructor(private router:Router, private loading:LoadingService, private route:ActivatedRoute, private customerService:CustomersService, private authService:AuthService) { }

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
    if(!this.isOwner) {
      this.router.navigate(['home']);
    }
    this.loading.closePopup();
  }

  goBack() {
    this.router.navigate(['customer-details', this.customer.id]);
  }

  async createProject() {}  

}

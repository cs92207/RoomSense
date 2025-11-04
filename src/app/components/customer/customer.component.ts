import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: false
})
export class CustomerComponent  implements OnInit {

  @Input() customer:Customer = new Customer;
  @Output() deleteTriggered = new EventEmitter<void>();

  edit:boolean = false;
  editName:string = "";
  link: string = 'https://teamswap.de/customer-details/';
  copyToastVisible = false;

  constructor(private customerService:CustomersService, private loading:LoadingService, private router:Router) { }

  ngOnInit() {}

  async copyLinkToClipboard() {
    try {
      await navigator.clipboard.writeText(this.link + this.customer.id);
      this.copyToastVisible = true;
    } catch (err) {
      console.error('Kopieren fehlgeschlagen: ', err);
    }
  }

  startEdit() {
    this.editName = this.customer.name;
    this.edit = true;
  }

  async saveNewName() {
    this.edit = false;
    this.loading.showPopup();
    await this.customerService.saveNameFromCustomer(this.customer.id, this.editName);
    this.customer.name = this.editName;
    this.loading.closePopup();
  }

  async openTodoPage() {
    if(this.edit) {
      return;
    }
    this.router.navigate(['customer-details', this.customer.id]);
  }

  async deleteCustomer() {
    this.loading.showPopup();
    this.customerService.deleteCustomer(this.customer.id);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

}

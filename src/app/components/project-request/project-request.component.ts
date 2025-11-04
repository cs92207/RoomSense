import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectRequest } from 'src/app/models/project-request';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrls: ['./project-request.component.scss'],
  standalone: false
})
export class ProjectRequestComponent  implements OnInit {

  @Input() projectRequest:ProjectRequest = new ProjectRequest;
  @Input() isOwner:boolean = false;

  @Output() deleteTriggered = new EventEmitter<void>();

  shortDescription:string = "";

  constructor(private customerService:CustomersService, private loading:LoadingService) { }

  ngOnInit() {
    this.loadShortDescription();
    console.log(this.isOwner);
  }

  async acceptRequest() {
    this.loading.showPopup();
    await this.customerService.acceptProjectRequest(this.projectRequest.id);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  async withdrawRequest() {
    this.loading.showPopup();
    await this.customerService.withdrawProjectRequest(this.projectRequest.id);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  async refuseRequest() {
    this.loading.showPopup();
    await this.customerService.refuseProjectRequest(this.projectRequest.id);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  loadShortDescription() {
    if(this.projectRequest.description.length < 124) {
      this.shortDescription = this.projectRequest.description;
      return;
    }
    for(let i = 0; i < 124; i++) {
      this.shortDescription += this.projectRequest.description.charAt(i);
    }
    this.shortDescription += "...";
  }

}

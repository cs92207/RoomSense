import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: false
})
export class ProjectComponent  implements OnInit {

  @Input() project:Project = new Project;
  @Input() isOwner:boolean = false;

  @Output() deleteTriggered = new EventEmitter<void>();

  shortDescription:string = "";

  constructor(private router:Router, private loading:LoadingService, private customerService:CustomersService) { }

  ngOnInit() {
    this.loadShortDescription();
  }

  goToProjectDetails() {
    this.router.navigate(['project-details', this.project.id, this.project.customer]);
  }

  async deleteProject() {
    this.loading.showPopup();
    await this.customerService.deleteProject(this.project.id);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  loadShortDescription() {
    if(this.project.description.length < 124) {
      this.shortDescription = this.project.description;
      return;
    }
    for(let i = 0; i < 124; i++) {
      this.shortDescription += this.project.description.charAt(i);
    }
    this.shortDescription += "...";
  }

}

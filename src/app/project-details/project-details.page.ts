import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomersService } from '../services/customers.service';
import { LoadingService } from '../services/loading.service';
import { Todo } from '../models/todo';
import { Customer } from '../models/customer';
import { Project } from '../models/project';
import { User } from '../models/user';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { PopupService } from '../services/popup.service';
import { LoadingOverlayService } from '../services/loading-overlay.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
  standalone: false
})
export class ProjectDetailsPage implements OnInit {

  todos:Todo[] = [];
  project:Project = new Project;
  projectID:number = 0;
  customer:Customer = new Customer;
  isOwner:boolean = false;

  checkedTodos:Todo[] = [];
  uncheckedTodos:Todo[] = [];
  futureTodos:Todo[] = [];

  newName:string = "";
  newDescription:string = "";

  isLoading:boolean = false;  
  text:string = "";

  isAI:boolean = false;
  isAIAudio:boolean = false;


  constructor(
    private customerService:CustomersService, 
    private popUpService:PopupService, 
    private router:Router, 
    private loading:LoadingService, 
    private route:ActivatedRoute, 
    private authService:AuthService,
    private loader: LoadingOverlayService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    this.loading.showPopup();
    let paID = this.route.snapshot.paramMap.get("project");
    if(paID != null) {
      this.projectID = parseInt(paID);
    }
    let mCustomerID = this.route.snapshot.paramMap.get("customer");
    if(mCustomerID == null) {
      this.router.navigate(['home']);
      return;
    }
    this.project = await this.customerService.getProjectByID(this.projectID);
    if(mCustomerID != this.project.customer) {
      this.router.navigate(['home']);
      return;
    }
    this.todos = await this.customerService.getTodosFromProject(this.projectID, mCustomerID);
    this.customer = await this.customerService.getCustomerByID(this.project.customer);
    let mUser:User|null = await this.authService.getCurrentUser();
    if(mUser == null) {
      this.isOwner = false;
    } else {
      if(mUser.id == this.customer.user) {
        this.isOwner = true;
      }
    }
    this.loading.closePopup();
    this.isLoading = false;
    this.loadCheckedTodos();
    this.loadUnCheckedTodos();
    this.loadFutureTodos();
  }

  async convertToTodos() {
    this.isAI = true;
    await this.customerService.translateTextToTodos(this.text, this.project.id, 0, this.project.customer);
    this.text = "";
    this.updateTodoList();
    this.isAI = false;
  }

  async runTranscribe(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    this.isAIAudio = true;
    await this.customerService.translateAudioToTodos(file, this.project.id, 0, this.project.customer);
    this.updateTodoList();
    this.isAIAudio = false;
  }


  async finishProject() {
    this.loading.showPopup();
    await this.customerService.finishProject(this.project.id);
    this.loading.closePopup();
    this.router.navigate(['customer-details', this.customer.id]);
  }

  backToProjects() {
    this.router.navigate(['customer-details', this.customer.id]);
  }

  async updateTodoList() {
    this.loading.showPopup();
    this.todos = await this.customerService.getTodosFromProject(this.projectID, this.customer.id);
    this.loadCheckedTodos();
    this.loadUnCheckedTodos();
    this.loadFutureTodos();
    this.loading.closePopup();
  }

  drop(event: CdkDragDrop<any[]>) {
    if(!this.isOwner)
      return
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.updateTodoStatus(event.container.id, event.container.data[event.currentIndex]);
  }

  async acceptTodoRequest(todo: Todo) {
    this.loading.showPopup();
    await this.customerService.acceptTodo(todo.id);
    this.loading.closePopup();
    todo.request = 0;
  }

  async updateTodoStatus(listID:string, todo: Todo) {
    let statusID = 0;
    if(listID == "future") {
      statusID = 0;
    } else if(listID == "unchecked") {
      statusID = 1;
    } else if(listID == "checked") {
      statusID = 2
    }
    if(todo.request == 1 && statusID != 0) {
      this.acceptTodoRequest(todo);
    }
    let n = 0;
    let index = 0;
    this.todos.forEach((element) => {
      if(element.id == todo.id) {
        index = n;
      }
      n++;
    });
    this.todos[index].checked = statusID;
    this.loadCheckedTodos();
    this.loadFutureTodos();
    this.loadUnCheckedTodos();
    await this.customerService.changeCheckedOfTodo(todo.id, statusID, this.customer.id);
    await this.customerService.calculateProjectStatus(this.project.id);
  }

  async createTodo() {
    this.loading.showPopup();
    if(this.newName.length > 20) {
      this.popUpService.showAlert("The Todo name can be a maximum of 20 characters long.");
      return;
    }
    if(this.isOwner) {
      await this.customerService.createTodo(this.newName, this.newDescription, this.project.id, 0, this.customer.id)
    } else {
      await this.customerService.createTodo(this.newName, this.newDescription, this.project.id, 1, this.customer.id)
    }
    this.newName = "";
    this.newDescription = "";
    this.todos = [];
    this.checkedTodos = [];
    this.uncheckedTodos = [];
    this.futureTodos = [];
    this.todos = await this.customerService.getTodosFromProject(this.projectID, this.customer.id);
    this.loadCheckedTodos();
    this.loadUnCheckedTodos();
    this.loadFutureTodos();
    await this.customerService.calculateProjectStatus(this.project.id);
    this.loading.closePopup();
  }

  loadFutureTodos() {
    this.futureTodos = [];
    this.todos.forEach((todo) => {
      if(todo.checked == 0)
        this.futureTodos.push(todo)
    })
  }

  loadCheckedTodos() {
    this.checkedTodos = [];
    this.todos.forEach((todo) => {
      if(todo.checked == 2)
        this.checkedTodos.push(todo);
    });
  }

  loadUnCheckedTodos() {
    this.uncheckedTodos = [];
    this.todos.forEach((todo) => {
      if(todo.checked == 1)
        this.uncheckedTodos.push(todo);
    })
  }

}

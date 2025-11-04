import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Todo } from '../models/todo';
import { ProjectRequest } from '../models/project-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  // url = "https://sv-studios.de/team_swap/api/";
  url = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient, private storage:Storage, private authService:AuthService) { }

  async saveNameFromCustomer(customer:string, name:string) {
    const url = this.url + "customers/" + customer + "/name";
    const body = {
      id : customer,
      name: name
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.patch<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async createTodo(name:string, description: string, project: number, request:number, customerID:string) {
    const url = this.url + "todos/" + customerID;
    let mDesctiption = description;
    if(mDesctiption == "") {
      mDesctiption = "-";
    }
    const body = {
      name: name,
      description: mDesctiption,
      project: project,
      request: request,
      checked: 0
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async translateAudioToTodos(file:File, projectID:number, request:number, customerID:string) {
    const url = "http://144.76.83.19:8001/transcribe";
    const formData = new FormData();
    formData.append('file', file);
    try {
      let response = await this.http.post<any>(url, formData).toPromise();
      let text = response['transcript'];
      await this.translateTextToTodos(text, projectID, request, customerID);
    } catch(error: any) {
      console.log(error);
    }
  }

  async translateAudioToScript(file:File) : Promise<string> {
    const url = "http://144.76.83.19:8001/transcribe";
    const formData = new FormData();
    formData.append('file', file);
    try {
      let response = await this.http.post<any>(url, formData).toPromise();
      return response['transcript'];
    } catch(error: any) {
      console.log(error);
    }
    return "";
  }

  async translateTextToTodos(text:string, projectID:number, request:number, customerID:string) : Promise<Todo[]> {
    const url = "http://144.76.83.19:8000/todos";
    const body = {
      content: text
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      let response = await this.http.post<any>(url, body, { headers }).toPromise();
      console.log(response);
      let clean = response['result']
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
      console.log(clean);
      const data = JSON.parse(clean);
      data.forEach(async (element:any) => {
        await this.createTodo(element['name'], element['description'], projectID, request, customerID);
      });
      return [];
    } catch(error: any) {
      console.log(error);
    }
    return [];
  }

  async createProjectRequest(name:string, description:string, customer:string, price:number, deadline:Date) {
    const url = this.url + "project-requests";
    const body = {
      name: name,
      description: description,
      customer: customer,
      price: price,
      deadline: deadline
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async getLastTodoFromUser(userId:number) : Promise<Todo> {
    const url = this.url + "last-todo/" + userId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      let res = await this.http.get<any>(url, { headers }).toPromise();
      return {
        id: res['todo']['id'],
        project: res['todo']['project'],
        name: res['todo']['name'],
        description: res['todo']['description'],
        checked: res['todo']['checked'],
        request: res['todo']['request']
      }
    } catch(error: any) {
      console.log(error);
    }
    return new Todo;
  }

  async deleteTodo(todoID:number, customerID:string) {
    const url = this.url + "todos/" + todoID + "/" + customerID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async finishProject(projectID:number) {
    const url = this.url + "projects/" + projectID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async createProject(name:string, description:string, customer:string, price:number, deadline:Date) {
    const url = this.url + "projects";
    const body = {
      name: name,
      description: description,
      customer: customer,
      price: price,
      status: 0,
      deadline: deadline
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async getProjectRequestByID(requestID:number) : Promise<ProjectRequest> {
    const url = this.url + "project-requests/details/" + requestID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      let res = await this.http.get<any>(url, { headers }).toPromise();
      console.log(res);
      return {
        id: res['projectRequests']['id'],
        customer: res['projectRequests']['customer'],
        description: res['projectRequests']['description'],
        name: res['projectRequests']['name'],
        price: res['projectRequests']['price'],
        deadline: res['projectRequests']['deadline']
      }
    } catch(error: any) {
      console.log(error);
    }
    return new ProjectRequest;
  }

  async acceptProjectRequest(requestID:number) {
    const url = this.url + "project-requests/accept/" + requestID;
    console.log(await this.authService.loadAuthToken())
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });
    const body = {  };
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async refuseProjectRequest(requestID:number) {
    const url = this.url + "project-requests/refuse/" + requestID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });
    const body = {  };
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async withdrawProjectRequest(requestID:number) {
    const url = this.url + "project-requests/withdraw/" + requestID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    const body = {  };
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async deleteProject(project:number) {
    const url = this.url + "projects/" + project;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async deleteCustomer(customer:string) {
    const url = this.url + "customers/" + customer;
    const body = {};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async calculateProjectStatus(project:number) {
    const url = this.url + "project/calculate/" + project;
    const body = {
      project: project
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.patch<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async acceptTodo(todo:number) {
    const url = this.url + "todos/accept/" + todo;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.patch<any>(url, {}, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async refuseTodo(todo:number, customerID:string) {
    const url = this.url + "todos/" + todo + "/" + customerID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async withdrawTodo(todo:number, customerID:string) {
    const url = this.url + "todos/" + todo + "/" + customerID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async changeCheckedOfTodo(todo:number, checked:number, customerID:string) {
    const url = this.url + "todos/checked/" + todo + "/" + checked + "/" + customerID;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.patch<any>(url, {}, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async getProjectByID(id:number) : Promise<Project> {
    const url = this.url + "projects/" + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      let res = await this.http.get<any>(url, { headers }).toPromise();
      return {
        id: res['project']['id'],
        name: res['project']['name'],
        customer: res['project']['customer'],
        description: res['project']['description'],
        status: res['project']['status'],
        price: res['project']['price'],
        deadline: res['project']['deadline']
      }
    } catch(error: any) {
      console.log(error);
    }
    return new Project;
  }

  async getCustomerByID(id:string) : Promise<Customer> {
    const url = this.url + "customers/" + id;
    const body = {  };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      let res = await this.http.get<any>(url, { headers }).toPromise();
      console.log(res);
      return {
        id: res['customer']['id'],
        name: res['customer']['name'],
        user: res['customer']['user']
      }
    } catch(error: any) {
      console.log(error);
    }
    return new Customer;
  }

  async createCustomer(user:number, name:string) {
    const url = this.url + "customers";
    const body = {
      user : user,
      name: name
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error: any) {
      console.log(error);
    }
  }

  async getTodosFromProject(project:number, customer:string) : Promise<Todo[]> {
    const url = this.url + "todos/project/" + project + "/" + customer;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      console.log(response);
      let todos:Todo[] = [];
      response['todos'].forEach((element: any) => {
        todos.push({
          id: element['id'],
          project: element['project'],
          description: element['description'],
          name: element['name'],
          checked: element['checked'],
          request: element['request']
        });
      });
      return todos;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  async getCustomerProjectRequests(customer:string) : Promise<ProjectRequest[]> {
    const url = this.url + "project-request/" + customer;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      console.log(response);
      let projects:ProjectRequest[] = [];
      response['projectRequests'].forEach((element: any) => {
        projects.push({
          id: element['id'],
          customer: element['customer'],
          description: element['description'],
          name: element['name'],
          price: element['price'],
          deadline: element['deadline']
        });
      });
      return projects;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  async getAllProjectRequestsFromUser() : Promise<ProjectRequest[]> {
    const url = this.url + "project-requests-from-user";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      let projectRequests:ProjectRequest[] = [];
      response['projectRequests'].forEach((element: any) => {
        projectRequests.push({
          id: element['id'],
          customer: element['customer'],
          description: element['description'],
          name: element['name'],
          price: element['price'],
          deadline: element['deadline']
        });
      });
      return projectRequests;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  async getAllProjectsFromUser() : Promise<Project[]> {
    const url = this.url + "projects-from-user";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      console.log(response);
      let projects:Project[] = [];
      response['projects'].forEach((element: any) => {
        projects.push({
          id: element['id'],
          customer: element['customer'],
          description: element['description'],
          name: element['name'],
          status: element['status'],
          price: element['price'],
          deadline: element['deadline']
        });
      });
      return projects;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  async getAllCustomerProjects(customer:string) : Promise<Project[]> {
    const url = this.url + "projects/customer/" + customer;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      let projects:Project[] = [];
      response['projects'].forEach((element: any) => {
        projects.push({
          id: element['id'],
          customer: element['customer'],
          description: element['description'],
          name: element['name'],
          status: element['status'],
          price: element['price'],
          deadline: element['deadline']
        });
      });
      return projects;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  async getAllCustomersFromUser(user:number) : Promise<Customer[]> {
    const url = this.url + "customers/user/" + user;
    const body = {  };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}` 
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      let customers:Customer[] = [];
      response['customers'].forEach((element: any) => {
        customers.push({
          id: element['id'],
          user: element['user'],
          name: element['name']
        });
      });
      return customers;
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

}

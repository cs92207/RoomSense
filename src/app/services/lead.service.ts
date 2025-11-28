import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  // url = "https://api.pauen-it.de/team_swap/api/";
  url = "http://127.0.0.1:8000/api/";

  constructor(
    private http:HttpClient,
    private storage:Storage,
    private authService:AuthService
  ) {}

  // ---------------------------------------------------------
  // CREATE LEAD
  // ---------------------------------------------------------
  async createLead(
    firstname:string,
    lastname:string,
    address:string,
    email:string,
    phone:string,
    status:string,
    source:string,
    order_type:string,
    rating:string,
    notes:string
  ) {
    const url = this.url + "lead";

    const body = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      phone: phone,
      status: status,
      source: source,
      order_type: order_type,
      rating: rating,
      notes: notes
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error) {
      console.log(error);
    }
  }

  // ---------------------------------------------------------
  // UPDATE LEAD
  // ---------------------------------------------------------
  async updateLead(
    id:number,
    firstname:string,
    lastname:string,
    address:string,
    email:string,
    phone:string,
    status:string,
    source:string,
    order_type:string,
    rating:string,
    notes:string
  ) {
    const url = this.url + "lead/" + id;

    const body = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      phone: phone,
      status: status,
      source: source,
      order_type: order_type,
      rating: rating,
      notes: notes
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(error) {
      console.log(error);
    }
  }

  // ---------------------------------------------------------
  // DELETE LEAD
  // ---------------------------------------------------------
  async deleteLead(id:number) {
    const url = this.url + "lead/" + id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      await this.http.delete<any>(url, { headers }).toPromise();
    } catch(error) {
      console.log(error);
    }
  }

  // ---------------------------------------------------------
  // GET LEAD BY ID
  // ---------------------------------------------------------
  async getLeadByID(id:number) : Promise<Lead> {
    const url = this.url + "lead/" + id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      let res = await this.http.get<any>(url, { headers }).toPromise();

      return {
        id: res['lead']['id'],
        user: res['lead']['user'],
        firstname: res['lead']['firstname'],
        lastname: res['lead']['lastname'],
        address: res['lead']['address'],
        email: res['lead']['email'],
        phone: res['lead']['phone'],
        status: res['lead']['status'],
        source: res['lead']['source'],
        order_type: res['lead']['order_type'],
        rating: res['lead']['rating'],
        notes: res['lead']['notes']
      };

    } catch(error) {
      console.log(error);
    }

    return new Lead();
  }

  // ---------------------------------------------------------
  // GET ALL LEADS FROM USER
  // ---------------------------------------------------------
  async getAllLeadsFromUser() : Promise<Lead[]> {
    const url = this.url + "leads";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      let response = await this.http.get<any>(url, { headers }).toPromise();

      let leads:Lead[] = [];
      response['leads'].forEach((element:any) => {
        leads.push({
          id: element['id'],
          user: element['user'],
          firstname: element['firstname'],
          lastname: element['lastname'],
          address: element['address'],
          email: element['email'],
          phone: element['phone'],
          status: element['status'],
          source: element['source'],
          order_type: element['order_type'],
          rating: element['rating'],
          notes: element['notes']
        });
      });

      return leads;

    } catch(error) {
      console.log(error);
      return [];
    }
  }

}

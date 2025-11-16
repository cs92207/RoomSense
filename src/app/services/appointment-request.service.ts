import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentRequest } from '../models/appointment-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRequestsService {

  //url = "http://127.0.0.1:8000/api/";
  url = "https://api.pauen-it.de/team_swap/api/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  async createRequest(req: AppointmentRequest): Promise<AppointmentRequest | null> {
    const endpoint = this.url + "appointment-requests";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.post<any>(endpoint, req, { headers }).toPromise();
      return res['appointment_request'];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async acceptRequest(id: number, option: number): Promise<any> {
    const endpoint = this.url + `appointment-requests/${id}/accept`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.post<any>(endpoint, { option }, { headers }).toPromise();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async declineRequest(id: number): Promise<boolean> {
    const endpoint = this.url + `appointment-requests/${id}/decline`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      await this.http.delete<any>(endpoint, { headers }).toPromise();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getRequestById(id: number): Promise<AppointmentRequest | null> {
    const endpoint = this.url + `appointment-requests/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      return res['appointment_request'];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getRequestsForCustomer(customerId: string): Promise<AppointmentRequest[]> {
    const endpoint = this.url + `appointment-requests/customer/${customerId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      return res['appointment_requests'] as AppointmentRequest[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

}

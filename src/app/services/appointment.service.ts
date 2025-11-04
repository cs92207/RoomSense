import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Appointment } from '../models/appointment';
import { AppointmentScript } from '../models/appointment-script';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  url = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  async createAppointment(appointment: Appointment): Promise<Appointment | null> {
    const endpoint = this.url + "appointments";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.post<any>(endpoint, appointment, { headers }).toPromise();
      return res['appointment'];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getScriptsFromAppointment(appointmentId:number) : Promise<AppointmentScript[]> {
    const apiUrl = this.url + "scripts-from-appointment/" + appointmentId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(apiUrl, { headers }).toPromise();
      let appointmentScripts:AppointmentScript[] = [];
      res['data'].forEach((element:any) => {
        appointmentScripts.push({
          id: element['id'],
          appointment: element['appointment'],
          audio: element['audio'],
          script: element['script']
        });
      });
      return appointmentScripts;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateAppointment(appointmentId: number, updateData: Partial<Appointment>): Promise<Appointment | null> {
    const endpoint = this.url + `appointments/${appointmentId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.put<any>(endpoint, updateData, { headers }).toPromise();
      return res['appointment'];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteAppointment(appointmentId: number): Promise<boolean> {
    const endpoint = this.url + `appointments/${appointmentId}`;
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

  async getAppointmentById(appointmentId: number): Promise<Appointment> {
    const endpoint = this.url + `appointments/${appointmentId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      return res['appointment'];
    } catch (error) {
      console.log(error);
      return new Appointment;
    }
  }

  async getAppointmentsForCustomer(customerId: string): Promise<Appointment[]> {
    const endpoint = this.url + `customer/${customerId}/appointments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      console.log(res);
      return res['appointments'] as Appointment[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createAppointmentScript(appointmentId: number, audioFile?: File, scriptText?: string): Promise<any> {
    const endpoint = this.url + "appointment-scripts";
    const token = await this.authService.loadAuthToken();

    const formData = new FormData();
    formData.append('appointment', appointmentId.toString());
    if (audioFile) formData.append('audio', audioFile);
    if (scriptText) formData.append('script', scriptText);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const res = await this.http.post<any>(endpoint, formData, { headers }).toPromise();
      console.log(res);
      return res['data'];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAppointmentScriptById(id: number): Promise<any> {
    const endpoint = this.url + `appointment-scripts/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateAppointmentScript(id: number, audioFile?: File, scriptText?: string): Promise<any> {
    const endpoint = this.url + `appointment-scripts/${id}`;
    const token = await this.authService.loadAuthToken();

    const formData = new FormData();
    if (audioFile) formData.append('audio', audioFile);
    if (scriptText) formData.append('script', scriptText);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const res = await this.http.post<any>(endpoint, formData, { headers }).toPromise();
      return res['data'];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAppointmentsFromUser(userID:number) : Promise<Appointment[]> {
    const endpoint = this.url + `appointments/user/${userID}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });
    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      let appointments:Appointment[] = [];
      res['appointments'].forEach((element:any) => {
        appointments.push({
          id: element['id'],
          audio_path: element['audio_path'],
          created_at: element['created_at'],
          customer: element['customer'],
          date: element['date'],
          plattform: element['plattform'],
          project: element['project'],
          time: element['time'],
          topic: element['topic'],
          updated_at: element['updated_at'],
          deadline: 0
        });
      });
      return appointments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async deleteAppointmentScript(id: number): Promise<boolean> {
    const endpoint = this.url + `appointment-scripts/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      await this.http.delete(endpoint, { headers }).toPromise();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllAppointmentScripts(): Promise<any[]> {
    const endpoint = this.url + `appointment-scripts`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${await this.authService.loadAuthToken()}`
    });

    try {
      const res = await this.http.get<any>(endpoint, { headers }).toPromise();
      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

}

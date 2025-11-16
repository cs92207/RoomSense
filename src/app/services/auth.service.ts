import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://api.pauen-it.de/team_swap/api/";
  // apiURL = "http://127.0.0.1:8000/api/";

  currentUser:null|User = null;
  tokenKey:string = "auth_token_shop";
  
  constructor(private http:HttpClient, private storage:Storage) { }

  async getCurrentUser() : Promise<User|null> {
    if(this.currentUser != null) {
      return this.currentUser;
    }
    let token:string = await this.loadAuthToken();
    return await this.autoSignIn(token);
  }

  async signOut() {
    this.currentUser = null;
    await this.storage.create();
    this.storage.remove(this.tokenKey);
  }

  async forgotPassword(email:string) {
    const url = this.apiURL + "password/forgot";
    const body = {
      "email" : email
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      await this.http.post<any>(url, body, { headers }).toPromise();
    } catch(e) {
      console.log(e);
    }
  }

  async resetPassword(email:string, token:string, password:string, password_confirmed:string) {
    const url = this.apiURL + "password/reset";
    const body = {
      "email" : email,
      "password" : password,
      "token": token,
      "password_confirmed": password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      let res = await this.http.post<any>(url, body, { headers }).toPromise();
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }

  async autoSignIn(token:string) : Promise<User|null> {
    const url = this.apiURL + "autosignin";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      if(!response['success'] || response['success'] == 0) {
        return null;
      }
      return {
        id: response['user']['id'],
        email: response['user']['email'],
        emailVerified: response['user']['email_verified_at'] == null ? false : true,
      }
    } catch(e) {
      return null;
    }
  }

  async signUp(email:string, password:string, passwordRepeat:string) : Promise<string> {
    const url = this.apiURL + "signup";
    const body = {
      "email" : email,
      "password" : password,
      "password_confirmed": passwordRepeat
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = await this.http.post<any>(url, body, { headers }).toPromise();
      console.log(response);
      if(response['message'])
        return response['message'];
      else if(response['error']) 
        return response['error'];
      else
        return "Fehler beim registrieren.";
    } catch(error: any) {
      console.log(error);
      return "Fehler beim registrieren.";
    }
  }

  async signIn(email:string, password:string) : Promise<SignInResponse> {
    const url = this.apiURL + "signin";
    const body = {
      email: email,
      password: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    try {
      const response = await this.http.post<any>(url, body, { headers }).toPromise();
      console.log(response);
      if(!response['success'] || response['success'] == 0) {
        if(response['message']) {
          return {
            success: false,
            message: response['message']
          };
        }
        return {
          success: false,
          message: "Fehler bei der Anmeldung."
        };
      }
      this.currentUser = {
        id: response['user']['id'],
        email: response['user']['email'],
        emailVerified: response['user']['email_verified_at'] == null ? false : true
      }
      await this.storeAuthToken(response['token']);
      return {
        success: true,
        message: response['message']
      }
    } catch(e) {
      return {
        success: false,
        message: "Fehler bei der Anmeldung."
      }
    }
  }

  async storeAuthToken(token:string) {
    await this.storage.create();
    await this.storage.set(this.tokenKey, token);
  }

  async loadAuthToken() : Promise<string> {
    await this.storage.create();
    return await this.storage.get(this.tokenKey);
  }

}

export class SignInResponse {
  success:boolean = false;
  message:string = "";
}

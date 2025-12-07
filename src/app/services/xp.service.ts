import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  // apiURL = "http://127.0.0.1:8000/api/";
  apiURL = "https://api.pauen-it.de/room_sense/api/";
  tokenKey: string = "auth_token_organisation";

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  private async getAuthHeaders(): Promise<HttpHeaders> {
    await this.storage.create();
    const token = await this.storage.get(this.tokenKey);

    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
  }

  // ==============================
  // GET XP eines Users
  // ==============================
  async getXp(userId: number): Promise<number> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}xp/${userId}`;

    try {
      const res: any = await this.http.get(url, { headers }).toPromise();
      return res?.xp?.xp ?? 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  // ==============================
  // ADD XP (User bekommt XP dazu)
  // ==============================
  async addXp(userId: number, xp: number): Promise<number> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}xp/${userId}/add`;

    try {
      const res: any = await this.http.post(
        url,
        { xp },
        { headers }
      ).toPromise();

      return res?.xp?.xp ?? 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  // ==============================
  // SET XP (selten benutzt)
  // ==============================
  async setXp(userId: number, xp: number): Promise<number> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}xp/${userId}`;

    try {
      const res: any = await this.http.put(
        url,
        { xp },
        { headers }
      ).toPromise();

      return res?.xp?.xp ?? xp;
    } catch (e) {
      console.log(e);
      return xp;
    }
  }
}

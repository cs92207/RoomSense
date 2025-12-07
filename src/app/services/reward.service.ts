import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Reward } from '../models/reward';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

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
  // GET: alle Rewards vom User
  // ==============================
  async getRewards(): Promise<Reward[]> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}rewards`;

    try {
      const res: any = await this.http.get(url, { headers }).toPromise();
      return (res.rewards || []).map((r: any) => Reward.fromJson(r));
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  // ==============================
  // GET: einzelnes Reward
  // ==============================
  async getReward(id: number): Promise<Reward | null> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}rewards/${id}`;

    try {
      const res: any = await this.http.get(url, { headers }).toPromise();
      return Reward.fromJson(res.reward);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // ==============================
  // POST: Reward erstellen
  // ==============================
  async createReward(
    title: string,
    required_xp: number,
    description?: string
  ): Promise<Reward | null> {

    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}rewards`;

    const body = {
      title,
      description,
      required_xp
    };

    try {
      const res: any = await this.http.post(url, body, { headers }).toPromise();
      return Reward.fromJson(res.reward);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // ==============================
  // PUT: Reward updaten
  // ==============================
  async updateReward(
    rewardId: number,
    data: Partial<Reward>
  ): Promise<Reward | null> {

    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}rewards/${rewardId}`;

    try {
      const res: any = await this.http.put(url, data, { headers }).toPromise();
      return Reward.fromJson(res.reward);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // ==============================
  // DELETE: Reward löschen
  // ==============================
  async deleteReward(rewardId: number): Promise<boolean> {
    const headers = await this.getAuthHeaders();
    const url = `${this.apiURL}rewards/${rewardId}`;

    try {
      await this.http.delete(url, { headers }).toPromise();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

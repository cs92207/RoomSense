import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  // apiURL = "http://127.0.0.1:8000/api/";
  apiURL = "https://api.pauen-it.de/room_sense/api/";
  tokenKey: string = "auth_token_organisation";

  constructor(private http: HttpClient, private storage: Storage) {}

  // =========================================
  // Helper: Auth-Header laden
  // =========================================
  private async getAuthHeaders(): Promise<HttpHeaders> {
    await this.storage.create();
    const token = await this.storage.get(this.tokenKey);

    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
  }

  // =========================================
  // Hole alle Räume des eingeloggten Users
  // =========================================
  async getRooms(): Promise<Room[]> {
    const url = this.apiURL + "rooms";
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.get<any>(url, { headers }).toPromise();
      return (res["rooms"] || []).map((r: any) => Room.fromJson(r));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // =========================================
  // Hole alle Räume eines bestimmten Users
  // =========================================
  async getRoomsFromUser(userId: number): Promise<Room[]> {
    const url = this.apiURL + `rooms/user/${userId}`;
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.get<any>(url, { headers }).toPromise();
      return (res["rooms"] || []).map((r: any) => Room.fromJson(r));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // =========================================
  // Hole EINEN Raum
  // =========================================
  async getRoom(roomId: number): Promise<Room | null> {
    const url = this.apiURL + `rooms/${roomId}`;
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.get<any>(url, { headers }).toPromise();
      return Room.fromJson(res["room"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // =========================================
  // Raum erstellen
  // =========================================
  async createRoom(name: string, description: string = ""): Promise<Room | null> {
    const url = this.apiURL + "rooms";
    const headers = await this.getAuthHeaders();

    const body = {
      name: name,
      description: description
    };

    try {
      const res = await this.http.post<any>(url, body, { headers }).toPromise();
      return Room.fromJson(res["room"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // =========================================
  // Raum aktualisieren (any field)
  // =========================================
  async updateRoom(roomId: number, data: any): Promise<Room | null> {
    const url = this.apiURL + `rooms/${roomId}`;
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.put<any>(url, data, { headers }).toPromise();
      return Room.fromJson(res["room"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // =========================================
  // Nur den Namen eines Raumes ändern
  // =========================================
  async updateNameFromRoom(roomId: number, newName: string): Promise<Room | null> {
    const url = this.apiURL + `rooms/${roomId}`;
    const headers = await this.getAuthHeaders();

    const body = {
      name: newName
    };

    try {
      const res = await this.http.put<any>(url, body, { headers }).toPromise();
      return Room.fromJson(res["room"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // =========================================
  // Raum löschen
  // =========================================
  async deleteRoom(roomId: number): Promise<boolean> {
    const url = this.apiURL + `rooms/${roomId}`;
    const headers = await this.getAuthHeaders();

    try {
      await this.http.delete(url, { headers }).toPromise();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

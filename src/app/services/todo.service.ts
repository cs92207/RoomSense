import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // apiURL = "http://127.0.0.1:8000/api/";
  apiURL = "https://api.pauen-it.de/room_sense/api/";
  tokenKey: string = "auth_token_organisation";

  constructor(private http: HttpClient, private storage: Storage) {}

  private async getAuthHeaders(): Promise<HttpHeaders> {
    await this.storage.create();
    const token = await this.storage.get(this.tokenKey);

    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
  }

  // ==============================
  // GET: Todos eines Raumes (Todo[])
  // ==============================
  async getTodos(roomId: number): Promise<Todo[]> {
    const url = `${this.apiURL}rooms/${roomId}/todos`;
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.get<any>(url, { headers }).toPromise();
      return (res["todos"] || []).map((t: any) => Todo.fromJson(t));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // ==============================
  // POST: Create Todo (return Todo)
  // ==============================
  async createTodo(roomId: number, title: string, xp: number, difficulty: string): Promise<Todo | null> {
    const url = `${this.apiURL}rooms/${roomId}/todos`;
    const headers = await this.getAuthHeaders();

    const body = { title, xp, difficulty };

    try {
      const res = await this.http.post<any>(url, body, { headers }).toPromise();
      return Todo.fromJson(res["todo"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // ==============================
  // PUT: Update Todo (return Todo)
  // ==============================
  async updateTodo(todoId: number, data: any): Promise<Todo | null> {
    const url = `${this.apiURL}todos/${todoId}`;
    const headers = await this.getAuthHeaders();

    try {
      const res = await this.http.put<any>(url, data, { headers }).toPromise();
      return Todo.fromJson(res["todo"]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // ==============================
  // DELETE: Todo (true/false)
  // ==============================
  async deleteTodo(todoId: number): Promise<boolean> {
    const url = `${this.apiURL}todos/${todoId}`;
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

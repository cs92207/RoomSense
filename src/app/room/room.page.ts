import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from "../shared/shared.module";
import { PopupService } from '../services/popup.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
  standalone: false
})
export class RoomPage implements OnInit {

  ANALYZED_ROOMS = "ANALYZED_ROOMS";

  roomId!: number;
  todos: Todo[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private http: HttpClient,
    private popUp:PopupService,
    private storage:Storage
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.roomId = Number(this.route.snapshot.paramMap.get('room_id'));
    await this.loadTodos();
    this.loading = false;
  }

  async loadTodos() {
    this.todos = await this.todoService.getTodos(this.roomId);
    this.sortTodos();
  }

  sortTodos() {
    const order = { EASY: 1, NORMAL: 2, HARD: 3 };
  }

  async analyzeRoom(event: any) {
    await this.storage.create();
    let analyzedRooms = 0;
    analyzedRooms = await this.storage.get(this.ANALYZED_ROOMS);
    if(analyzedRooms) {
      if(analyzedRooms >= 3) {
        this.popUp.showAlert("Du darfst maximal 3 Räume analysieren. Außer ihr gebt mir euer Geld :)");
        return;
      }
    } else {
      analyzedRooms = 0;
    }
    analyzedRooms++;
    await this.storage.set(this.ANALYZED_ROOMS, analyzedRooms);
    const file: File = event.target.files[0];
    if (!file) {
      this.popUp.showAlert("Datei konnte nicht hochgeladen werden.");
      return;
    }

    for (const todo of this.todos) {
      await this.todoService.deleteTodo(todo.id);
    }

    this.loading = true;
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res: any = await this.http
        .post('http://144.76.83.19:8000/room-todos', fd)
        .toPromise();

      console.log(res);
    

      let todos = res.todos;

      if (typeof todos === 'string') {
        todos = todos
          .replace(/```json|```/g, '')
          .trim();
        todos = JSON.parse(todos);
      }

      for (const t of todos) {
        await this.todoService.createTodo(
          this.roomId,
          t.name,
          t.xp,
          t.difficulty
        );
      }

      await this.loadTodos();
      this.loading = false;
    } catch(e) {
      console.log(e);
    }
  }

  async todoDone(todo: Todo) {
    // ✅ TODO: XP gutschreiben (später)
    // this.xpService.addXP(todo.xp);

    await this.todoService.deleteTodo(todo.id);
    await this.loadTodos();
  }
}

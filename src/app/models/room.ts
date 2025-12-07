import { Todo } from "./todo";

export class Room {
  id!: number;
  user_id!: number; // <--- NEU
  name!: string;
  description?: string;
  todos?: Todo[];

  static fromJson(json: any): Room {
    const room = new Room();
    room.id = json.id;
    room.user_id = json.user_id; // <--- NEU
    room.name = json.name;
    room.description = json.description;

    if (json.todos) {
      room.todos = json.todos.map((t: any) => Todo.fromJson(t));
    }

    return room;
  }
}

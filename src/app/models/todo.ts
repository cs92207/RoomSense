export class Todo {
  id!: number;
  room_id!: number;
  title!: string;
  is_done!: boolean;
  xp!: number;
  difficulty!: string;

  static fromJson(json: any): Todo {
    const t = new Todo();
    t.id = json.id;
    t.room_id = json.room_id;
    t.title = json.title;
    t.is_done = json.is_done;
    t.xp = json.xp;
    t.difficulty = json.difficulty;
    return t;
  }
}

export class Reward {
  id!: number;
  user_id!: number;
  title!: string;
  description?: string;
  required_xp!: number;
  is_unlocked!: boolean;

  static fromJson(json: any): Reward {
    const r = new Reward();
    r.id = json.id;
    r.user_id = json.user_id;
    r.title = json.title;
    r.description = json.description;
    r.required_xp = json.required_xp;
    r.is_unlocked = json.is_unlocked;
    return r;
  }
}

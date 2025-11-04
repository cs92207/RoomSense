export class Appointment {

    id:number = 0;
    customer:string = "";
    project:number = 0;
    date:string = "";
    time:string = "";
    plattform:string = "";
    topic:string = "";
    audio_path:string|null = null;
    created_at:string|null = null;
    updated_at:string|null = null;
    deadline:number = 0; // 0 = no Deadline; 1 = Deadline; 2 = Deadline Request

}
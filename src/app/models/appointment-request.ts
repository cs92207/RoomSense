export class AppointmentRequest {
    id:number = 0;
    customer:string = "";
    project:number = 0;
    topic:string = "";
    plattform:string | null = null;
    option1_date:string | null = null;
    option1_time:string | null = null;
    option2_date:string | null = null;
    option2_time:string | null = null;
    option3_date:string | null = null;
    option3_time:string | null = null;
    audio_path:string = "";
    status: string = "";
    owner:number = 0;
    created_at:string = "";
    updated_at:string = "";
}
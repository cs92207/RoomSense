import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentsService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { LoadingService } from '../services/loading.service';
import { Project } from '../models/project';
import { CustomersService } from '../services/customers.service';
import { ProjectRequest } from '../models/project-request';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false
})
export class CalendarPage implements OnInit {

  collapsed = false;
  isLoading: boolean = false;
  user: User = new User();
  appointments: Appointment[] = [];

  currentDate: Date = new Date();
  weeks: any[] = [];
  selectedDate: Date = new Date();

  projectsFromUser:Project[] = [];
  projectRequestsFromUser:ProjectRequest[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private authService: AuthService,
    private loading: LoadingService,
    private customerService:CustomersService
  ) { }

  async ngOnInit() {
    this.loading.showPopup();
    const mUser: User | null = await this.authService.getCurrentUser();
    if (!mUser) {
      location.href = "dashboard";
      return;
    }
    this.user = mUser;
    this.projectsFromUser = await this.customerService.getAllProjectsFromUser();
    this.projectRequestsFromUser = await this.customerService.getAllProjectRequestsFromUser();
    this.appointments = await this.appointmentService.getAppointmentsFromUser(this.user.id);
    this.loadProjectDeadlineAppointments();
    this.loadProjectRequestsDeadlineAppointments();
    this.generateCalendar();
    this.loading.closePopup();
  }

  loadProjectDeadlineAppointments() {
    this.projectsFromUser.forEach((project) => {
      this.appointments.push({
        id: -1,
        audio_path: "",
        created_at: "",
        customer: project.customer,
        date: project.deadline,
        deadline: 1,
        plattform: "",
        project: project.id,
        time: "",
        topic: "",
        updated_at: ""
      });
    });
  }

  loadProjectRequestsDeadlineAppointments() {
    this.projectRequestsFromUser.forEach((projectRequest) => {
      this.appointments.push({
        id: -1,
        audio_path: "",
        created_at: "",
        customer: projectRequest.customer,
        date: projectRequest.deadline,
        deadline: 2,
        plattform: "",
        project: projectRequest.id,
        time: "",
        topic: "",
        updated_at: ""
      });
    });
  }

  onSidebarChange(state: boolean) {
    this.collapsed = state;
  }

  generateCalendar() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const totalDays = lastDay.getDate();

    let day = 1 - startDay;
    const weeks = [];

    while (day <= totalDays) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        week.push({
          date: d,
          isCurrentMonth: d.getMonth() === this.currentDate.getMonth(),
          isToday: this.isSameDate(d, new Date()),
          appointments: this.getAppointmentsForDay(d)
        });
        day++;
      }
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  getAppointmentsForDay(date: Date): Appointment[] {
    const dayStr = date.toISOString().split('T')[0];
    return this.appointments.filter(a => a.date === dayStr);
  }

  isSameDate(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDay(day: any) {
    if (!day.isCurrentMonth) return;
    this.selectedDate = day.date;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonToast } from "@ionic/angular/standalone";
import { Room } from 'src/app/models/room';
import { Todo } from 'src/app/models/todo';
import { LoadingService } from 'src/app/services/loading.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  standalone: false
})
export class RoomComponent  implements OnInit {

  @Input() room:Room = new Room;

  editName:string = "";
  edit:boolean = false;

  constructor(
    private router:Router,
    private loading:LoadingService,
    private roomService:RoomService
  ) { }

  ngOnInit() {}

  openRoomPage() {
    this.router.navigate(['room', this.room.id]);
  }

  startEdit() {
    this.editName = this.room.name;
    this.edit = true;
  }

  async saveNewName() {
    this.edit = false;
    this.loading.showPopup();
    await this.roomService.updateNameFromRoom(this.room.id, this.editName);
    this.room.name = this.editName;
    this.loading.closePopup();
  }

  async deleteCustomer() {
    this.loading.showPopup();
    this.roomService.deleteRoom(this.room.id);
    this.loading.closePopup();
  }

}

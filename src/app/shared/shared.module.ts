import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { ProfileButtonComponent } from '../components/profile-button/profile-button.component';
import { ProfilePopoverComponent } from '../components/profile-popover/profile-popover.component';
import { RoomComponent } from '../components/room/room.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { RewardsModalComponent } from '../components/rewards-modal/rewards-modal.component';
import { CreateRoomModalComponent } from '../components/create-room-modal/create-room-modal.component';



@NgModule({
  declarations: [
    ProfileButtonComponent,
    ProfilePopoverComponent,
    RoomComponent,
    TodoListComponent,
    RewardsModalComponent,
    CreateRoomModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports: [
    ProfileButtonComponent,
    ProfilePopoverComponent,
    RoomComponent,
    TodoListComponent,
    RewardsModalComponent,
    CreateRoomModalComponent
  ]
})
export class SharedModule { }

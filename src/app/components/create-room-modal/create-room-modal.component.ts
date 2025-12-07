import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.scss'],
  standalone: false
})
export class CreateRoomModalComponent {

  name: string = '';
  description: string = '';
  loading = false;
  error: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private roomService: RoomService
  ) {}

  async createRoom() {
    if (!this.name.trim()) {
      this.error = 'Bitte einen Raumnamen eingeben.';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await this.roomService.createRoom(
        this.name,
        this.description
      );
      this.modalCtrl.dismiss({ created: true });
    } catch (e) {
      this.error = 'Raum konnte nicht erstellt werden.';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.modalCtrl.dismiss({ created: false });
  }
}

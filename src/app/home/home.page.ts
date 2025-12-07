import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { XpService } from '../services/xp.service';
import { ModalController } from '@ionic/angular';
import { RewardsModalComponent } from '../components/rewards-modal/rewards-modal.component';
import { RewardService } from '../services/reward.service';
import { Reward } from '../models/reward';
import { CreateRoomModalComponent } from '../components/create-room-modal/create-room-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false
})
export class HomePage implements OnInit {

  user:User = new User;

  tutorial:boolean = true;

  loading:boolean = false;

  rooms:Room[] = [];
  xp:number = 0;
  rewards:Reward[] = [];
  nextReward: Reward | null = null;
  xpMissing: number = 0;
  rewardProgressPercent: number = 0;

  constructor(
    private storage:Storage,
    private authService:AuthService,
    private router:Router,
    private roomService:RoomService,
    private xpService:XpService,
    private modalController:ModalController,
    private rewardService:RewardService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.storage.create();
    let roomSenseTutorial: number = await this.storage.get("ROOM_SENSE_TUTORIAL");
    if (!roomSenseTutorial || roomSenseTutorial == 0) {
      this.tutorial = true;
    }
    let mUser = await this.authService.getCurrentUser();
    if(!mUser) {
      this.router.navigate(['sign-in']);
      return;
    }
    this.user = mUser!;
    this.rooms = await this.roomService.getRoomsFromUser(this.user.id);
    this.xp = await this.xpService.getXp(this.user.id);
    await this.loadXpAndRewards();
    this.loading = false;
  }

  async openCreateRoom() {
    const modal = await this.modalController.create({
      component: CreateRoomModalComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.created) {
      this.rooms = await this.roomService.getRoomsFromUser(this.user.id);
    }
  }

  async openRewards() {
    const modal = await this.modalController.create({
      component: RewardsModalComponent
    });
    await modal.present();
  }

  async loadXpAndRewards() {

    this.rewards = await this.rewardService.getRewards();

    const lockedRewards = this.rewards
      .filter(r => !r.is_unlocked)
      .sort((a, b) => a.required_xp - b.required_xp);

    if (lockedRewards.length === 0) {
      this.nextReward = null;
      return;
    }

    this.nextReward = lockedRewards[0];

    this.xpMissing = Math.max(
      this.nextReward.required_xp - this.xp,
      0
    );

    this.rewardProgressPercent = Math.min(
      this.xp / this.nextReward.required_xp,
      1
    );
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['sign-in']);
  }

  async closeTutorial() {
    this.tutorial = false;
    await this.storage.create();
    await this.storage.set("ROOM_SENSE_TUTORIAL", 1);
  }

}

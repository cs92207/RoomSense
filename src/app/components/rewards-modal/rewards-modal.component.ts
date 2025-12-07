import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/reward';

@Component({
  selector: 'app-rewards-modal',
  templateUrl: './rewards-modal.component.html',
  styleUrls: ['./rewards-modal.component.scss'],
  standalone: false
})
export class RewardsModalComponent implements OnInit {

  rewards: Reward[] = [];

  // Form
  title: string = '';
  description: string = '';
  requiredXp: number = 100;

  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private rewardService: RewardService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.loadRewards();
    this.loading = false;
  }

  async loadRewards() {
    this.rewards = await this.rewardService.getRewards();
  }

  async createReward() {
    if (!this.title || this.requiredXp < 100) return;

    this.loading = true;

    await this.rewardService.createReward(
      this.title,
      this.requiredXp,
      this.description
    );

    // Reset Form
    this.title = '';
    this.description = '';
    this.requiredXp = 100;

    await this.loadRewards();
    this.loading = false;
  }

  async deleteReward(reward: Reward) {
    await this.rewardService.deleteReward(reward.id);
    await this.loadRewards();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}

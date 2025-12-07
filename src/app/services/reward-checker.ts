import { Reward } from '../models/reward';
import { RewardService } from './reward.service';

export async function checkAndHandleRewards(
  currentXp: number,
  rewards: Reward[],
  rewardService: RewardService,
  onUnlocked: (reward: Reward) => void
) {
  const unlocked = rewards.filter(
    r => !r.is_unlocked && r.required_xp <= currentXp
  );

  for (const reward of unlocked) {
    // 🎉 ANZEIGE
    onUnlocked(reward);

    // 🗑️ Reward löschen (verbraucht)
    await rewardService.deleteReward(reward.id);
  }
}

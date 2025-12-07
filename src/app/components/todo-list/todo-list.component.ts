import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { XpService } from 'src/app/services/xp.service';
import { checkAndHandleRewards } from '../../services/reward-checker';
import { Reward } from 'src/app/models/reward';
import { RewardService } from 'src/app/services/reward.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: false
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = [];
  @Output() done = new EventEmitter<Todo>();

  animatingTodoId: number | null = null;
  user:User = new User

  constructor(
    private todoService:TodoService,
    private authService:AuthService,
    private router:Router,
    private xpService:XpService,
    private rewardService:RewardService,
    private toastCtrl:ToastController
  ) {  }

  async ngOnInit() {
      let mUser = await this.authService.getCurrentUser();
      if(!mUser) {
        this.router.navigate(['sign-in']);
        return;
      }
      this.user = mUser;
  }

  async markDone(todo: Todo, event: Event) {
    console.log("tes");
    this.animatingTodoId = todo.id;

    todo.is_done = !todo.is_done;

    await this.todoService.updateTodo(todo.id, {
      is_done: todo.is_done
    });

    const newXp = await this.xpService.addXp(this.user.id, todo.xp);

    setTimeout(() => {
      this.done.emit(todo);
      this.animatingTodoId = null;
    }, 900);

    const rewards: Reward[] = await this.rewardService.getRewards();
    await checkAndHandleRewards(
      newXp,
      rewards,
      this.rewardService,
      async (reward) => {
        const toast = await this.toastCtrl.create({
          message: `🎉 Belohnung freigeschaltet: ${reward.title}`,
          duration: 4000,
          color: 'success',
          position: 'top'
        });
        toast.present();
      }
    );
  }

  difficultyClass(diff: string) {
    return diff.toLowerCase();
  }

  get totalTodos(): number {
    return this.todos.length;
  }

  get doneTodos(): number {
    return this.todos.filter(t => t.is_done).length;
  }

  get progressPercent(): number {
    if (this.totalTodos === 0) return 0;
    return Math.round((this.doneTodos / this.totalTodos) * 100);
  }

  get progressText(): string {
    if (this.totalTodos === 0) return 'Noch keine Aufgaben';
    if (this.progressPercent === 100) return 'Alles erledigt 🎉 Mega!';
    if (this.progressPercent >= 75) return 'Fast geschafft 💪';
    if (this.progressPercent >= 40) return 'Guter Fortschritt 👍';
    return 'Los geht’s 🚀';
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TodoPopoverComponent } from '../todo-popover/todo-popover.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: false
})
export class TodoComponent  implements OnInit {

  @Input() todo:Todo = new Todo;
  @Input() isOwner:boolean = false;
  @Input() customer:string = "";

  @Output() deleteTriggered = new EventEmitter<void>();

  constructor(private customerService:CustomersService, private loading:LoadingService, private modalController:ModalController, private actionSheetController:ActionSheetController) { }

  ngOnInit() {}

  async openMoveMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Wohin willst du das Todo verschieben?',
      buttons: [
        {
          text: 'Nicht gestartet',
          handler: async () => {
            await this.customerService.changeCheckedOfTodo(this.todo.id, 0, this.customer);
            this.deleteTriggered.emit();
          }
        },
        {
          text: 'In Bearbeitung',
          handler: async () => {
            await this.customerService.changeCheckedOfTodo(this.todo.id, 1, this.customer);
            this.deleteTriggered.emit();
          }
        },
        {
          text: 'Fertig',
          role: 'destructive',
          handler: async () => {
            await this.customerService.changeCheckedOfTodo(this.todo.id, 2, this.customer);
            this.deleteTriggered.emit();
          }
        },
        {
          text: 'Abbrechen',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  getShortDescriptionFromTodo() : string {
    if(this.todo.description.length <= 20) {
      return this.todo.description;
    }
    let shortDescription = "";
    for(let i = 0; i < 20; i++) {
      shortDescription += this.todo.description.charAt(i);
    }
    shortDescription += "...";
    return shortDescription;
  }

  async showTodoDetails() {
    const modal = await this.modalController.create({
      component: TodoPopoverComponent,
      componentProps: {
        todo: this.todo
      }
    });
    await modal.present();
  }

  async acceptTodoRequest() {
    this.loading.showPopup();
    await this.customerService.acceptTodo(this.todo.id);
    this.loading.closePopup();
    this.todo.request = 0;
  }

  async deleteTodo() {
    this.loading.showPopup();
    await this.customerService.deleteTodo(this.todo.id, this.customer);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  async refuseTodoRequest() {
    this.loading.showPopup();
    await this.customerService.refuseTodo(this.todo.id, this.customer);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

  async withdrawTodoRequest() {
    this.loading.showPopup();
    await this.customerService.withdrawTodo(this.todo.id, this.customer);
    this.loading.closePopup();
    this.deleteTriggered.emit();
  }

}

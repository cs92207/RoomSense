import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-popover',
  templateUrl: './todo-popover.component.html',
  styleUrls: ['./todo-popover.component.scss'],
  standalone: false
})
export class TodoPopoverComponent implements OnInit {

  @Input() todo:Todo = new Todo;

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  closePopUp() {
    this.modalController.dismiss();
  }

}

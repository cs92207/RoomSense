import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.page.html',
  styleUrls: ['./datenschutz.page.scss'],
  standalone: false
})
export class DatenschutzPage implements OnInit {

  email = "ep@pauen-it.de"

  constructor() { }

  ngOnInit() {
  }

}

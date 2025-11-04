import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.page.html',
  styleUrls: ['./impressum.page.scss'],
  standalone: false
})
export class ImpressumPage implements OnInit {

  email = "ep@pauen-it.de"

  constructor() { }

  ngOnInit() {
  }

}

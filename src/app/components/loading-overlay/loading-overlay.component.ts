import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  standalone: true
})
export class LoadingOverlayComponent {
  @Input() visible: boolean = false;
}

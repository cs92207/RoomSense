import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent  implements OnInit {

  @Input() active:number = 0;
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;

  ngOnInit() {
    this.autoCollapseOnMobile();
  }

  @HostListener('window:resize')
  autoCollapseOnMobile() {
    this.isCollapsed = window.innerWidth < 768;
  }

  goToPage(page:string) {
    location.href = page;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

}

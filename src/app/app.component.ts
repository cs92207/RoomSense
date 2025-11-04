import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  user:User|null = null;

  constructor(private router:Router, private menuCtrl:MenuController, private authService:AuthService) {}  

  async ngOnInit() {
    await this.loadUser();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.update(); // ← Wird bei jedem Seitenwechsel aufgerufen
    });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]).then(() => {
      this.menuCtrl.close();
    });
  }

  update() {
    this.loadUser();
  }

  async loadUser() {
    this.user = await this.authService.getCurrentUser();
  }
  
}

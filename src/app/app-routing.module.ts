import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'email-confirmed',
    loadChildren: () => import('./email-confirmed/email-confirmed.module').then( m => m.EmailConfirmedPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'customer-details/:customer',
    loadChildren: () => import('./customer-details/customer-details.module').then( m => m.CustomerDetailsPageModule)
  },
  {
    path: 'project-details/:project/:customer',
    loadChildren: () => import('./project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },
  {
    path: 'create-project/:customer',
    loadChildren: () => import('./create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: 'project-request/:customer',
    loadChildren: () => import('./project-request/project-request.module').then( m => m.ProjectRequestPageModule)
  },
  {
    path: 'impressum',
    loadChildren: () => import('./impressum/impressum.module').then( m => m.ImpressumPageModule)
  },
  {
    path: 'datenschutz',
    loadChildren: () => import('./datenschutz/datenschutz.module').then( m => m.DatenschutzPageModule)
  },
  {
    path: 'agb',
    loadChildren: () => import('./agb/agb.module').then( m => m.AgbPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'appointment-details/:id',
    loadChildren: () => import('./appointment-details/appointment-details.module').then( m => m.AppointmentDetailsPageModule)
  },
  {
    path: 'appointment-script-details/:id',
    loadChildren: () => import('./appointment-script-details/appointment-script-details.module').then( m => m.AppointmentScriptDetailsPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },  {
    path: 'lead-management',
    loadChildren: () => import('./lead-management/lead-management.module').then( m => m.LeadManagementPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

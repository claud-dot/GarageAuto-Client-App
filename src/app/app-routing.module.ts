import { RepairComponent } from './components/home/repair/repair.component';
import { HistoryComponent } from './components/home/history/history.component';
import { CarComponent } from './components/home/car/car.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component : AppComponent,
    children : [
      {
        path : '',
        component : LoginComponent
      },
      {
        path : 'signup' ,
        component : SignupComponent
      }
    ],
    
  },
  {
    path : 'home',
    component : HomeComponent,
    children : [
      {
        path : '',
        component : CarComponent
      },
      {
        path : 'history',
        component : HistoryComponent
      },
      {
        path : 'repair',
        component : RepairComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { } 

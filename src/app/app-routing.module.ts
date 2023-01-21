import { CarDepotComponent } from './components/home/car-depot/car-depot.component';
import { RepairComponent } from './components/home/repair/repair.component';
import { HistoryComponent } from './components/home/history/history.component';
import { CarComponent } from './components/home/car/car.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, IsSignedInGuard } from './guards/auth.guard';
import { ClientGuard } from './guards/role.guard';
import { ClildGuard } from './guards/clild.guard';

const routes: Routes = [
  { path: '' , redirectTo :'/login' , pathMatch : 'full' },
  { path : 'login', component : LoginComponent , canActivate : [IsSignedInGuard] },
  { path : 'signup' , component : SignupComponent , canActivate : [IsSignedInGuard] },
  {
    path : 'home',
    component : HomeComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : CarComponent,
      },
      {
        path : 'depot-car',
        component : CarDepotComponent,
        canActivate : [ClientGuard]
      },
      {
        path : 'history',
        component : HistoryComponent,
        canActivate : [ClientGuard]
      },
      {
        path : 'repair',
        component : RepairComponent,
        canActivate : [ClientGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { } 

import { CarDepotComponent } from './components/home/car-depot/car-depot.component';
import { RepairComponent } from './components/home/repair/repair.component';
import { CarComponent } from './components/home/car/car.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, IsSignedInGuard } from './guards/auth.guard';
import { ClientGuard, FinancierGuard } from './guards/role.guard';
import { InfoCarComponent } from './components/home/info-car/info-car.component';
import { InoviceComponent } from './components/home/inovice/inovice.component';
import { PaymentConfirmationComponent } from './components/home/financier/payment-confirmation/payment-confirmation.component';
import { StatisticComponent } from './components/home/financier/statistic/statistic.component';
import { DeniedAccessComponent } from './error-page/denied-access/denied-access.component';
import { InvoiceGuard } from './guards/other.guard';

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
        canActivate :[ClientGuard,AuthGuard]
      },
      {
        path : 'depot-car',
        component : CarDepotComponent,
        canActivate : [ClientGuard,AuthGuard]
      },
      {
        path : 'info-car/:id_car',
        component : InfoCarComponent,
        canActivate : [ClientGuard,AuthGuard]
      },
      {
        path : 'repair',
        component : RepairComponent,
        canActivate : [ClientGuard,AuthGuard]
      },
      {
        path : 'invoice/:id_repair',
        component : InoviceComponent,
        canActivate : [InvoiceGuard,AuthGuard]
      },
      {
        path : 'financier',
        component : PaymentConfirmationComponent,
        canActivate : [FinancierGuard , AuthGuard],
      },
      {
        path : 'statistique',
        component : StatisticComponent,
        canActivate : [FinancierGuard , AuthGuard]
      }
    ]
  },
  {
    path : 'error-page',
    component : DeniedAccessComponent
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

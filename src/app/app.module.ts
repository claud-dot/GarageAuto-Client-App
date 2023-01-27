import { AuthGuard } from './guards/auth.guard';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';

import{ReceiveCarModule} from './receive-car/receive-car.module';
import {ReceiveCarRoutingModule} from './receive-car/receive-car-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { RepairComponent } from './components/home/repair/repair.component';
import { CarComponent } from './components/home/car/car.component';

import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { CarDepotComponent } from './components/home/car-depot/car-depot.component';
import { FormCarComponent } from './components/home/form-car/form-car.component';
import { InfoCarComponent } from './components/home/info-car/info-car.component';
import { InoviceComponent } from './components/home/inovice/inovice.component';
import { PaymentConfirmationComponent } from './components/home/financier/payment-confirmation/payment-confirmation.component';
import { StatisticComponent } from './components/home/financier/statistic/statistic.component';
import { DeniedAccessComponent } from './error-page/denied-access/denied-access.component';
import { LineAverageChartComponent } from './chart/line-average-chart/line-average-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { SimulationChartComponent } from './chart/simulation-chart/simulation-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RepairComponent,
    CarComponent,
    CarDepotComponent,
    FormCarComponent,
    InfoCarComponent,
    InoviceComponent,
    PaymentConfirmationComponent,
    StatisticComponent,
    DeniedAccessComponent,
    LineAverageChartComponent,
    BarChartComponent,
    SimulationChartComponent
    InoviceComponent,
    FormCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    MaterialModule,
    NgChartsModule
    ReceiveCarModule,
    ReceiveCarRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}

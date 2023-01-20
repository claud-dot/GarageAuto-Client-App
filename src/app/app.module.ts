import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { RepairComponent } from './components/home/repair/repair.component';
import { CarComponent } from './components/home/car/car.component';
import { HistoryComponent } from './components/home/history/history.component';

import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { CarDepotComponent } from './components/home/car-depot/car-depot.component';
import { FormCarComponent } from './components/home/form-car/form-car.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RepairComponent,
    CarComponent,
    HistoryComponent,
    CarDepotComponent,
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
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

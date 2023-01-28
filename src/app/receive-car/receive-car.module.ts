import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReceiveCarRoutingModule } from './receive-car-routing.module';
import { ReceiveCarListComponent } from './receive-car-list/receive-car-list.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    ReceiveCarListComponent,
    ReceiveCarListComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    ReceiveCarRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [ReceiveCarRoutingModule]
})
export class ReceiveCarModule { }

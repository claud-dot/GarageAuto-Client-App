import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceiveCarListComponent} from './receive-car-list/receive-car-list.component';
import {RepairComponent} from '../components/home/repair/repair.component';

const routes: Routes = [
  {path:'receiveCar/home',component:RepairComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveCarRoutingModule { }

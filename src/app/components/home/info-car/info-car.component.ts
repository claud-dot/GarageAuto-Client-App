import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-info-car',
  templateUrl: './info-car.component.html',
  styleUrls: ['./info-car.component.css']
})
export class InfoCarComponent implements OnInit {

  pagination : any = {page : 1, nbBypage : 5};
  metadata : any ; 

  constructor(private carService :  CarService) {}

  onPageChange(event : PageEvent){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

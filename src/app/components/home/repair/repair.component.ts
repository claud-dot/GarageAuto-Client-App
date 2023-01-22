import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CarService } from 'src/app/services/car.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {
  repairs : any;
  loading : any = {};
  pagination : any = {page : 1, nbBypage : 5}; 
  metadata : any = {};

  constructor(private carService : CarService ,private utils : UtlisService) {}
  

  getCarRepair(){
    this.loading.cars_repair = true;
    const success = (repairs : any)=>{
      this.metadata = repairs.metadata[0];
      this.repairs = repairs;
      console.log(this.metadata);
      
      
      this.loading.cars_repair = false;
    }

    const error = (error :  any)=>{
      this.utils.checkStatusErr(error.status);
      console.log("repair "+error.message);
      this.loading.cars_repair = false;
    }

    this.carService.getUserCarRepair(this.pagination).subscribe(success, error);
  }

  getStatusRepair(status : number){
    if(status == 0){
      return "En attente de facture";
    }else if(status == 1){
      return "En reparation";
    }else {
      return "Recuperé";
    }
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    console.log(startIndex , endIndex, event.length , event.previousPageIndex);
    this.pagination.nbBypage = endIndex-startIndex;
    this.pagination.page = endIndex/this.pagination.nbBypage;
    this.getCarRepair();
  }

  ngOnInit(): void {
      this.getCarRepair();
  }
}

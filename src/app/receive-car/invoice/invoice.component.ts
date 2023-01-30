import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  tableStyles = {
    'width': '100%'
  };
  newRowValue: string;
  tableRows:{value:string}[] = [];;
  
  constructor(private build: FormBuilder) {}
  
  addRow() {
    this.tableRows.push({value: this.newRowValue});
    this.newRowValue = '';
  }

  ngOnInit(): void {
    
  }

}

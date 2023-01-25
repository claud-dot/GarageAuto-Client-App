import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  tableStyles = {
    'width': '100%'
  };
  newRowValue: string;
  tableRows:{value:string}[] = [];;

  addRow() {
    this.tableRows.push({value: this.newRowValue});
    this.newRowValue = '';
  }
}

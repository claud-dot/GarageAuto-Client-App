import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input() dataConfirmation : string;

  constructor(private activeModal : NgbActiveModal) {}

  onClose(response : boolean){
    this.activeModal.close(response);
  }

  ngOnInit(): void {
    console.log(this.dataConfirmation);
  }

}

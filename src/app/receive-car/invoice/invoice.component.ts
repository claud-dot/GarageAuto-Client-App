import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { User } from "../user";
import { UserService } from "../user.service";
import { InvoiceService, Invoice, Comment } from "../invoice.service";
import { elementAt } from "rxjs";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  tableStyles = {
    'width': '100%'
  };


  tableData: { line_number: number; description: string; quantite: Number; prix_unitaire: number; prix_total: number }[] = [];
  inputData = {
    line_number: 1,
    description: '',
    quantite: 0,
    prix_unitaire: 0,
    prix_total: 0
  };
  line_number = 1;
  sub_total = 0;
  tva = 0;
  total = 0;

  user: User = {
    _id: '',
    username: '',
    role: '',
    email: '',
  };
  repair_id = '';
  modalRef: NgbModalRef;
  duration: number;
  durationType: string;
  form: FormGroup;
  form_duration: FormGroup;
  constructor(private route: ActivatedRoute,
    public userService: UserService,
    public invoiceService: InvoiceService,
    private modalService: NgbModal
  ) {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      quantite: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      prix_unitaire: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
    this.form.controls['quantite'].setValue('')
    this.form_duration = new FormGroup({
      duration: new FormControl('', [Validators.required]),
      durationType: new FormControl('', [Validators.required])
    });
  }
  addData() {
    if (this.form.valid) {
      this.inputData.description = this.form.get('description')?.value;
      this.inputData.prix_unitaire = this.form.get('prix_unitaire')?.value;
      this.inputData.quantite = this.form.get('quantite')?.value;
      this.line_number++;
      this.inputData.prix_total = this.inputData.prix_unitaire * this.inputData.quantite;
      console.log(this.inputData);
      this.tableData.push(this.inputData);
      this.sub_total = this.tableData.map(a => a.prix_total).reduce(function (a, b) {
        return a + b;
      });
      this.tva = (this.sub_total * 20) / 100;
      this.total = this.sub_total + this.tva;
    }

    // this.inputData = {
    //   line_number:this.line_number,
    //   description: '',
    //   quantite: 0,
    //   prix_unitaire:0,
    //   prix_total:0
    // };
  }
  ngOnInit() {
    // alert('ato');
    this.route.queryParams.subscribe(params => {
      console.log(params);
      
      let user_id = params['user_id'];
      let repair_id = params["repair_id"];
      console.log(user_id);
      this.repair_id = repair_id;
      this.getUser(user_id);
      console.log(this.user);
      // alert(this.repair_id);
      // alert(this.user.username);
    });
  }
  getUser(id: string) {
    this.userService.getById(id).subscribe(data => {
      this.user = data;
      console.log(this.user);
      
    }, error => {
      console.log(error);
    })
  }

  async sendInvoice(type: string) {
    if (this.form_duration.valid) {
      let comments: Comment[] = [];
      for (let element of this.tableData) {
        let result_comment: Comment = {
          description: element.description,
          qt: element.quantite,
          unit_price: element.prix_unitaire,
          montant: element.prix_total
        }
        comments.push(result_comment);
      }
      const myInvoice: Invoice = {
        repair_id: this.repair_id,
        results_comment: comments,
        duration: this.form_duration.get('duration')?.value,
        status: 0,
        unit_duration: this.form_duration.get('durationType')?.value
      }
      console.log(myInvoice);
      if (type == "voir") {
        this.invoiceService.getPdf(myInvoice).subscribe(res => {
          alert('invoice checked');
        }, error => {
          console.log(error);
        })
      }
      else if (type = "envoyer") {
        const result = await Swal.fire({
          title: 'Confirmation',
          text: "Voulez-vous envoyer la facture?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'valider',
          cancelButtonText: 'annuler'
        });

        if (result.value) {

          this.invoiceService.create(myInvoice).subscribe(res => {
            Swal.fire('Succès','facture envoyé','success')
          }, error => {
            Swal.fire('Erreur','','error');
            console.log(error);
          })
        }
      }
    }

  }
  openModal(content: any) {
    this.modalRef = this.modalService.open(content, { backdrop: 'static', backdropClass: 'custom-backdrop' });
  }
}

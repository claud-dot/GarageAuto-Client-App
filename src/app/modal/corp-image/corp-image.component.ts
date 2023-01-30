import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-corp-image',
  templateUrl: './corp-image.component.html',
  styleUrls: ['./corp-image.component.css']
})
export class CorpImageComponent implements OnInit {
  
  @Input() dataImage : any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  currentProcessingImg: any = 0;
  croperOptions : any = {};
  base64File : any;
  loading : any = {};

  constructor(private activeModal : NgbActiveModal , private utils : UtlisService , private imageCropService : ImageService , private userService : UserService) {}

  
  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  closeModal(dataRet : any){
    this.imageChangedEvent = null;
    var dataSend : any = {}
    dataSend.status = 400;
    if(dataRet=='accept'){
      dataSend = {
        status : 200,
        data : this.croppedImage
      } 
    }
    this.activeModal.close(dataSend);
  }

  onSaveImageCar(){
    this.loading.update = true;
    const success = (response : any)=>{
      this.loading.update = false;
      this.utils.openToastr(response.message , "Update photo car message", 'suucess');
      this.closeModal("accept");
    }

    const error = (error : HttpErrorResponse)=>{
      this.loading.update = false;
      this.utils.openToastr(error.error.message , "Update photo car message" , 'error')
    }
    this.userService.updateCarImage({ id_car : this.dataImage.car_user , image : this.croppedImage }).subscribe(success , error);
  }


  ngOnInit(): void {
    this.imageChangedEvent = this.dataImage.event;
  }
}

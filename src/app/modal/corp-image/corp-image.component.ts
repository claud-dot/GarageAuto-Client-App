import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-corp-image',
  templateUrl: './corp-image.component.html',
  styleUrls: ['./corp-image.component.css']
})
export class CorpImageComponent {
  
  @Input() dataImage : any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  currentProcessingImg: any = 0;
  croperOptions : any = {};

  constructor() {}

  
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
    //this.activeModal.close(dataSend);
  }


  

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  
  getRatioImage(widthImg : number , heigthImg : number){
    const widthPGCD = this.PGCD(widthImg);
    const heigthPGCD =  this.PGCD(heigthImg);
    const diviseursCommun : any = widthPGCD.filter((diviseur1 :number) => heigthPGCD.some((diviseur2 : number) => diviseur1 === diviseur2));
    const maxDiviseur = diviseursCommun.reduce((op : any, item : any) => op = op > item ? op : item, 0);
    const firstValue = widthImg / maxDiviseur;
    const secondValue = heigthImg / maxDiviseur;
    return {
      first : firstValue,
      second : secondValue
    }
  }

  getResizeToImage(widthImg : number , heigthImg : number){
    const ratioNum = this.getRatioImage(widthImg,heigthImg).first;
    const ratioDen = this.getRatioImage(widthImg,heigthImg).second;
    
    if(widthImg>heigthImg){
      widthImg = 645;
      heigthImg = (ratioDen * widthImg)/ratioNum;
    }else if(heigthImg>widthImg){
      heigthImg = 363;
      widthImg = (ratioNum * heigthImg)/ratioDen ;
    }else{
      widthImg = 645;
      heigthImg = 363;
    }
    return {
      width : Math.round(widthImg),
      heigth : Math.round(heigthImg)
    }
  }

  PGCD(nombre: number){
    var diviseur = 1;
    const listDiviseur : any = [];
    while(diviseur<=nombre){
      if(nombre%diviseur==0){
        listDiviseur.push(diviseur)
      }
      diviseur++;
    }

    return listDiviseur;
  }

  dataURItoBlob(img_url : string) {
    const byteString = window.atob(img_url);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  //Change directly image after change 
  onResizeImageCanvas(objectFile : any , height : number , width : number){
    if(objectFile.img_url){
      var img = document.createElement("img");
      img.setAttribute("src", objectFile.img_url);
      img.onload = (event : any) => {
          var canvas : any = document.createElement("canvas");
          var ctx :any = canvas.getContext("2d");
          // var toWidth = this.getResizeToImage(img.width,img.height).width;
          // var toHeight = this.getResizeToImage(img.width,img.height).heigth;
          var toWidth = width;
          var toHeight = height;
          canvas.width = toWidth;
          canvas.height = toHeight;
          ctx.drawImage(img, 0, 0, toWidth, toHeight);
          var dataurl = canvas.toDataURL("img");
          objectFile.img_url = dataurl
          //this.urlImagePub = dataurl;
      }
    }
    // img.src = objectFile.imgBase64;
  }

  resizeAllImage(datas : any[] , height : number , width : number){
    for (const data of datas) {
      this.onResizeImageCanvas(data.user_cars , height , width);
    }
  }
  
}

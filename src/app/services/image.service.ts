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
}

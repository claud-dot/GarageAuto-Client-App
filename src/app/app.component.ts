import { UtlisService } from './services/utlis.service';
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GarageAuto-Client-App';

  constructor(private utils : UtlisService){}

  public loadScript(url : string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(){
    this.loadScript("assets/js/main.js");
    this.loadScript("assets/js/popper.js");
  }

}

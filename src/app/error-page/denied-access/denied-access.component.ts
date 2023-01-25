import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-denied-access',
  templateUrl: './denied-access.component.html',
  styleUrls: ['./denied-access.component.css']
})
export class DeniedAccessComponent implements OnInit {

  public loadScript(url : string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
    //this.loadScript("assets/js/403.js")
  }
  

}

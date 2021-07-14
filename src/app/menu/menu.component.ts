import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuapiconnectService } from '../menuapiconnect.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu;
  prev=0;
  menuIndex;
  menuDisplay: boolean = false;
  count = 0;
  constructor(private mc: MenuapiconnectService) { }

  ngOnInit() {
    this.mc.getMenu().subscribe(
      data => {
        console.log(data)
        this.menu = data.MenuObj[0].result.menus[0].menu_sections
      },
      err => {
        console.log("Error in connection with menu api err:", err)
      }
    )
  }

  displayMenu(index) {
    
    this.menuIndex = index;
    if (this.count == 0) {
      this.prev=index;
      this.menuDisplay = !this.menuDisplay;
      this.count=this.count+1;
    }
    else{
      if(this.prev===index){
        this.menuDisplay = !this.menuDisplay;
      }
      else {
        this.prev=index;
        this.menuDisplay = true;
      }
    }
  }

  converttoFloat(num:string){
    
    let price=parseFloat(num).toFixed(2)
    if(parseInt(price)<10){
      price="0"+price
    }
    return price;
  }
}

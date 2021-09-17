import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartservicesService } from '../cartservices.service';
import { MenuapiconnectService } from '../menuapiconnect.service';
import { UserConnectApiService } from '../user-connect-api.service';
@Component({
  selector: 'app-ordernow',
  templateUrl: './ordernow.component.html',
  styleUrls: ['./ordernow.component.css']
})
export class OrdernowComponent {
  isClicked = []
  menu;
  prev;
  menuIndex;
  menuDisplay: boolean = false;
  count = 0;
  constructor(private mc: MenuapiconnectService, public cs: CartservicesService, public us: UserConnectApiService, private router: Router) { }

  ngOnInit() {
    this.mc.getMenu().subscribe(
      data => {
        this.menu = data.MenuObj[0].result.menus[0].menu_sections
        console.log(data)
      },
      err => {
        console.log("Error in connection with menu api err:", err)
      }
    )
  }

  displayMenu(index) {
    if (this.isClicked[index]) {
      this.isClicked[index] = false;
    }
    else {
      for (let i = 0; i < this.isClicked.length; i++) {
        if (this.isClicked[i] == true) {
          this.isClicked[i] = false;
        }
      }
      this.isClicked[index] = true;
    }
    this.menuIndex = index;
    if (this.count == 0) {
      this.prev = index;
      this.menuDisplay = !this.menuDisplay;
      this.count = this.count + 1;

    }
    else {
      if (this.prev === index) {
        this.menuDisplay = !this.menuDisplay;

      }
      else {
        this.prev = index;
        this.menuDisplay = true;

      }
    }
  }

  converttoFloat(num: string) {

    let price = parseFloat(num).toFixed(2)
    if (parseInt(price) < 10) {
      price = "0" + price
    }
    return price;
  }

  addToCart(price, name) {
    if (this.us.userLoginStatus === false) {
      alert('Please login to order')
      this.router.navigateByUrl('/login')
    }
    else {


      let count = 0;
      let index = 0;
      this.cs.totalprice = this.cs.totalprice + parseFloat(price)
      for (let i = 0; i < this.cs.fooditems.length; i++) {
        if (this.cs.fooditems[i].split(':')[0] === name) {
          index = i;
          count = this.cs.fooditems[i].split(':')[1] / price + 1;
        }
      }
      if (count === 0) {
        this.cs.fooditems.push(name + ":" + price)

      }
      else {
        this.cs.fooditems.splice(index, 1)
        this.cs.fooditems.push(name + ":" + count * parseFloat(price))

      }
      //this.cs.fooditems.push(name + ":" + price)
    }
  }

  filterItems(item) {
    let count = 0;
    for (let i = 0; i < this.cs.fooditems.length; i++) {
      if (this.cs.fooditems[i].split(':')[0] === item) {
        count = count + 1;
      }
    }
    if (count === 0) {
      return false
    }
    else {
      return true
    }
  }



  deleteFromCart(price, name) {
    this.cs.totalprice = this.cs.totalprice - parseFloat(price)
    let count = 0;
    let index = 0;
    for (let i = 0; i < this.cs.fooditems.length; i++) {
      if (this.cs.fooditems[i].split(':')[0] === name) {
        index = i;
        count = this.cs.fooditems[i].split(':')[1] / price - 1;
      }

    }

    if (count == 0) {
      this.cs.fooditems.splice(index, 1)
    }
    else {
      this.cs.fooditems.splice(index, 1)
      this.cs.fooditems.push(name + ":" + count * parseFloat(price))
    }
  }

  countItem(item, price) {
    let count = 0;
    for (let i = 0; i < this.cs.fooditems.length; i++) {
      if (this.cs.fooditems[i].split(':')[0] === item) {
        count = this.cs.fooditems[i].split(':')[1] / price
      }
    }
    return count;
  }
}

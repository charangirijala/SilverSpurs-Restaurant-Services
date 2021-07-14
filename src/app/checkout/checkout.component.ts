import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartservicesService } from '../cartservices.service';
import { UserConnectApiService } from '../user-connect-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public cs: CartservicesService, private us: UserConnectApiService,private router:Router) { }

  ngOnInit(): void {
  }
  placeOrder(obj) {
    let orderObj = { ...obj, totalprice: this.cs.totalprice, total_items: this.cs.fooditems }
    console.log(orderObj)
    let modifieduserObj = JSON.parse(localStorage.getItem('userObj'))
    modifieduserObj.previous_orders.push(orderObj)
    delete modifieduserObj._id;
    console.log(modifieduserObj)
    this.us.placeorder(modifieduserObj).subscribe(
      res=>{
        console.log(res)
        this.cs.totalprice=0;
        this.cs.fooditems=[];
        alert('The Order placed successfully')
        this.router.navigateByUrl('/ordernow')
      },
      err=>{
        alert('something went wrong please try again..')
        console.log(`Error in booking the table err:${err.message}`)
      }
    )
  }
}

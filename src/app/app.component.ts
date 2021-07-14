import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartservicesService } from './cartservices.service';
import { LoaderService } from './loader/loader.service';
import { MenuapiconnectService } from './menuapiconnect.service';
import { UserConnectApiService } from './user-connect-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'RestaurantServices';
  loaderValue:boolean=false;
  username=localStorage.getItem('username')
  userObj=JSON.parse(localStorage.getItem('userObj'))

  routerLink=`users/${this.username}`
  constructor(public us:UserConnectApiService,public cs:CartservicesService,private router:Router,public ls:LoaderService){

  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.ls.isLoading.subscribe(
        res=>{
          this.loaderValue=res;
        },
        err=>console.log(err)
      )
    });
    
  }
  userLogout(){
    localStorage.clear();
    this.us.userLoginStatus=false;
  }
  onCheckout(){
    this.router.navigateByUrl('checkout')
  }
}

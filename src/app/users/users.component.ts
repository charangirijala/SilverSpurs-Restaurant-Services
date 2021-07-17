import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserConnectApiService } from '../user-connect-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    prev_orders;
    prev_tables;
    prev_orders_bool:boolean=true;
    prev_tables_bool:boolean=true;
    id:number=Math.random()*12345;
    firstname=JSON.parse(localStorage.getItem('userObj')).firstname
    lastname=JSON.parse(localStorage.getItem('userObj')).lastname
    email=JSON.parse(localStorage.getItem('userObj')).email
    profilepic=JSON.parse(localStorage.getItem('userObj')).profileImage
  constructor(private us:UserConnectApiService,private ar:ActivatedRoute) { }
  ngOnInit(): void {
    let username
    this.us.username.subscribe(
      data=>{
        //console.log(data)
        username=data
      },
      err=>{

      }
    )
    //console.log(username)
    this.us.getorders(username).subscribe(
      res=>{
        this.prev_orders=res
        if(this.prev_orders[0]!=null){
          this.prev_orders_bool=false;
        }
      },
      err=>{
        console.log(`Error in getting the orders ${err.message}`)
      }
    )
    this.us.gettablebookings(username).subscribe(
      res=>{
        this.prev_tables=res;
        if(this.prev_tables[0]!=null){
          this.prev_tables_bool=false;
        }
      },
      err=>{
        console.log(`Error in getting the orders ${err.message}`)
      }
    )
  }
}

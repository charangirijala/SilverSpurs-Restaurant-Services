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
    id:number=Math.random()*12345;
    firstname=JSON.parse(localStorage.getItem('userObj')).firstname
    lastname=JSON.parse(localStorage.getItem('userObj')).lastname
    email=JSON.parse(localStorage.getItem('userObj')).email
    profilepic=JSON.parse(localStorage.getItem('userObj')).profileImage
  constructor(private us:UserConnectApiService,private ar:ActivatedRoute) { }
  ngOnInit(): void {
    let username=this.ar.snapshot.params.username
    this.us.getorders(username).subscribe(
      res=>{
        this.prev_orders=res
        console.log(this.prev_orders)
      },
      err=>{
        console.log(`Error in getting the orders ${err.message}`)
      }
    )
    this.us.gettablebookings(username).subscribe(
      res=>{
        this.prev_tables=res;
        console.log(this.prev_tables)
      },
      err=>{
        console.log(`Error in getting the orders ${err.message}`)
      }
    )
  }
}

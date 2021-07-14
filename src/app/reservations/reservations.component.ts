import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserConnectApiService } from '../user-connect-api.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private us:UserConnectApiService,private router:Router) { }

  ngOnInit(): void {
  }
  onTableBook(tablereq){
    console.log(tablereq)
    if(this.us.userLoginStatus===false){
      alert('Please login to book the table')
      this.router.navigateByUrl('/login')
    }
    else{
      let modifieduserObj=JSON.parse(localStorage.getItem('userObj'))
      modifieduserObj.table_bookings.push(tablereq)
      delete modifieduserObj._id;
      console.log(modifieduserObj)
      this.us.bookatable(modifieduserObj).subscribe(
        res=>{
          console.log(res)
          alert('The table booked')
        },
        err=>{
          alert('something went wrong please try again..')
          console.log(`Error in booking the table err:${err.message}`)
        }
      )
    }
  }
}

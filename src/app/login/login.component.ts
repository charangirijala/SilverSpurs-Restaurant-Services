import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserConnectApiService } from '../user-connect-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  previous_bookings;
  constructor(public us:UserConnectApiService,private router:Router) { }

  ngOnInit(): void {
  }
  onLogin(credentialsObj){
    //console.log(credentialsObj)
    this.us.loginUser(credentialsObj).subscribe(
      res=>{
        if(res.message==="Login Success"){
          console.log(res.username)
          this.us.username$.next(res.username)
          localStorage.setItem("username",res.username)
          localStorage.setItem("token",res.token)
          localStorage.setItem("userObj",JSON.stringify(res.userObject))
          //console.log(res.userObject)
          this.us.userLoginStatus=true
          alert('Login success')
          this.router.navigateByUrl(`/users/${res.username}`)
      
          
        }
        if(res.message==="Invalid username"){
          alert('Invalid username')
        }
        if(res.message==="Invalid Password"){
          alert('Invalid password')
        }
      },
      err=>{
        alert('Something went wrong')
      }
    )
  }


  forgotpass(){
    this.router.navigateByUrl('/forgotpassword')
  }
}

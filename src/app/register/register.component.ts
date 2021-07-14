import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../models/user.model';
import { UserConnectApiService } from '../user-connect-api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private user:UserConnectApiService,private router:Router) { }

  ngOnInit(): void {
  }

  file:File;
  onPhotoUpload(event){
    this.file=event.target.files[0]

  }

  onUserSubmit(userObj,ref:NgForm){
    let formData=new FormData();
      userObj.table_bookings=[]
      userObj.previous_orders=[]
    formData.append("photo",this.file)
    formData.append("userObj",JSON.stringify(userObj))
    //console.log(userObj)
    this.user.createUser(formData).subscribe(
      result=>{
        
        console.log(result)
        if(result.message=="User created"){
          alert("User created")
          this.router.navigateByUrl('/login')
        }
        else{
          alert("Username already exsists,please try another...")
          ref.resetForm();
        }
      }, 
      err=>{
        console.log(err)
      }
    )
  }

  
}

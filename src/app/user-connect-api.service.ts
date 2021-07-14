import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConnectApiService {
  userLoginStatus=false;
  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post('/users/createuser',userObj)
  }

  loginUser(userObj):Observable<any>{
    return this.hc.post('/users/login',userObj)
  }

  //book a table
  bookatable(userObj):Observable<any>{
    let url='/users/'+localStorage.getItem('username')+'/booknewtable'
    return this.hc.put(url,userObj,{responseType:"text"})
  }

  //place am order
  placeorder(userObj):Observable<any>{
    let url='/users/'+localStorage.getItem('username')+'/placeorder'
    return this.hc.put(url,userObj,{responseType:"text"})
  }

  //get the previous orders
  getorders(username){
    return this.hc.get(`/users/getorders/${username}`)
  }

  //get prevoius table bookings
  gettablebookings(username){
    return this.hc.get(`/users/gettablebookings/${username}`)
  }
}


import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuapiconnectService implements OnInit {

  constructor(private hc: HttpClient) { }
  ngOnInit() {

  }
  getMenu():Observable<any> {
    
    return this.hc.get('/restaurant/menu')
      
  }
}

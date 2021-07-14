import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartservicesService {
  totalprice:number=0;
  fooditems=[]
  constructor() { }
}

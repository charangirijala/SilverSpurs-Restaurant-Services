import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$=new BehaviorSubject<boolean>(false)
  isLoading=this.isLoading$.asObservable();


  updateLoader(bool:boolean){

    this.isLoading$.next(bool)
  }
  constructor() { }
}

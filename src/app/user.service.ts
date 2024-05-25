import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser = new BehaviorSubject<any>(null);

setSharedData(data: any) {
  this.loggedInUser.next(data);
}

getSharedData() {
  return this.loggedInUser.asObservable();
}
}

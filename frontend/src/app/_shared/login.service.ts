import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: boolean = false;
  constructor() {  }

  set Authenticate(status: boolean){
    this.loggedIn = status
  }

  get isAuthenticated(){
    return this.loggedIn
  }


}

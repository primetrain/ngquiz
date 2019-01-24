import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: Boolean
  constructor() {  }

  set Authenticate(status: Boolean){
    this.loggedIn = status
  }

  get isAuthenticated(){
    return this.loggedIn
  }


}

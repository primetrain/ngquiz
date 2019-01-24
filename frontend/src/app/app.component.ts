import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './_shared/login.service';

declare var FB;

@Component({
  selector: 'app-root-default',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private router: Router, private loginService: LoginService){}

  ngOnInit(): void {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2212098502337513',
        cookie     : true,
        xfbml      : true,
        version    : 'v1.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response)=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            this.loginService.Authenticate = true;
            this.router.navigate(["/admin/questions"])
           }
           else
           {
           console.log('User login failed');
         }
      });

  }


}


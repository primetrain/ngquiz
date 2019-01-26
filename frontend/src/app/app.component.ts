import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './_shared/login.service';
import {
  OAuthService,
  OAuthErrorEvent,
  LoginOptions
} from "angular-oauth2-oidc"; // Add this import

declare let FB;

@Component({
  selector: 'app-root-default',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  username = "";

  constructor(private router: Router, private loginService: LoginService, private oauthService: OAuthService,
              private ngZone: NgZone) {

    oauthService
      .loadDiscoveryDocument() // Load information from Auth0
      .then(() => oauthService.tryLogin()) // See if the hash fragment contains tokens (when user got redirected back)
      .then(() => {
        if (!oauthService.hasValidAccessToken()) {
          // If we're still not logged in yet, try with a silent refresh:
          return oauthService.silentRefresh();
        }
      })
      .then(() => {
        if (oauthService.getIdentityClaims()) {
          this.username = oauthService.getIdentityClaims()["name"]; // Get username, if possible.
        }
      });
    oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit(): void {
  }

  submitLogin() {
    console.log("submit login to facebook");
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        this.loginService.Authenticate = true;

        this.ngZone.run(() => {
          this.router.navigate(["/admin/questions"])
        });
      }
      else {
        console.log('User login failed');
      }
    });

  }

  submitGoogleLogin() {
    this.login();
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

  get claims() {
    return this.oauthService.getIdentityClaims();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  refresh() {
    this.oauthService.silentRefresh();
  }
}


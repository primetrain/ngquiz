import { Component, OnInit } from "@angular/core";
import {
  OAuthService,
  OAuthErrorEvent,
  LoginOptions
} from "angular-oauth2-oidc"; // Add this import

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  username = "";

  get token() {
    return this.oauthService.getAccessToken();
  }
  get claims() {
    return this.oauthService.getIdentityClaims();
  }

  constructor(private oauthService: OAuthService) {
    // For debugging:
    oauthService.events.subscribe(e =>
      e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e)
    );

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

  ngOnInit() {
    this.login();
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

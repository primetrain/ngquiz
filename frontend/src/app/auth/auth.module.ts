import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  OAuthModule,
  AuthConfig,
  JwksValidationHandler,
  ValidationHandler,
  OAuthStorage,
  OAuthModuleConfig
} from "angular-oauth2-oidc"; // Added

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

const config: AuthConfig = {
  issuer: "https://shridatta.auth0.com/",
  clientId: "mZH4wPJ2FV7mku0vDTKp5jfOpbEArrKB",
  redirectUri: window.location.origin + "/admin/questions",
  logoutUrl:
    "https://shridatta.auth0.com/api/v2/logout?returnTo=" +
    encodeURIComponent(window.location.origin),
  silentRefreshRedirectUri: window.location.origin + "/silent-refresh.html",
  scope: "openid profile email"
};

config.logoutUrl = `${config.issuer}/api/v2/logout?client_id=${
  config.clientId
}&returnTo=${encodeURIComponent(config.redirectUri)}`;

// Could also go to its own file, but we just dump it next to the AppModule.
const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ["http://localhost:4200"],
    sendAccessToken: true
  }
};

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    OAuthModule.forRoot(authModuleConfig)
  ],
  providers: [
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: AuthConfig, useValue: config }
  ]
})
export class AuthModule {}

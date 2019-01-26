import {Injectable, NgZone} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {forkJoin, Observable, of, ReplaySubject, Subject, zip} from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {map} from "rxjs/operators";

declare let FB;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // facebook login listening observable
  private _isLoggedInViaFacebook = new ReplaySubject<boolean>(1);
  private _isLoggedInViaFacebook$: Observable<boolean> = this._isLoggedInViaFacebook.asObservable();

  // google login listening observable
  private _isLoggedInViaGoogle = new ReplaySubject<boolean>(1);
  private _isLoggedInViaGoogle$: Observable<boolean> = this._isLoggedInViaGoogle.asObservable();

  // google login listening observable
  private _isLoggedIn = new ReplaySubject<boolean>(1);
  private _isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private router: Router,
              private oauthService: OAuthService) {

    let thisObj = this;

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '2212098502337513',
        cookie: true,
        xfbml: true,
        version: 'v1.1'
      });
      FB.AppEvents.logPageView();

      fnFbLoginCheck(FB, thisObj);
    };
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    fromPromise(this.oauthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      map(() => {

        if (this.oauthService.hasValidIdToken()) { //or AccessToken
          console.log('Logged in to google.');
          this._isLoggedInViaGoogle.next(true);
          return;
        }

        console.log('Google is not logged in');
        this._isLoggedInViaGoogle.next(false);
      })
    ).subscribe();

    if ((window as any).FB !== undefined) {
      fnFbLoginCheck(FB, this);
    }

    zip(this._isLoggedInViaFacebook$, this._isLoggedInViaGoogle$).subscribe(res => {
      const isLoggedIn = res[0] || res[1];

      console.log(`Logged in anywhere: ${isLoggedIn}`);
      if (!isLoggedIn) {
        this.router.navigate([""]);
      }

      this._isLoggedIn.next(isLoggedIn);
    });

    return this._isLoggedIn$;
  }
}

function fnFbLoginCheck(fb, thisObj) {

  // Check for facebook authentication
  fb.getLoginStatus(function (response) {

    console.log(`Facebook login status: ${response.status}`);
    if (response.status === 'connected') {
      // The user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire.
      let uid = response.authResponse.userID;
      let accessToken = response.authResponse.accessToken;

      console.info(`Facebook userId: ${uid}`);
      console.info(`Facebook accessToken: ${accessToken}`);
      thisObj._isLoggedInViaFacebook.next(true);
      return;
    } else if (response.status === 'authorization_expired') {
      // The user has signed into your application with
      // Facebook Login but must go through the login flow
      // again to renew data authorization. You might remind
      // the user they've used Facebook, or hide other options
      // to avoid duplicate account creation, but you should
      // collect a user gesture (e.g. click/touch) to launch the
      // login dialog so popup blocking is not triggered.
    } else if (response.status === 'not_authorized') {
      // The user hasn't authorized your application.  They
      // must click the Login button, or you must call FB.login
      // in response to a user gesture, to launch a login dialog.
    } else {
      // The user isn't logged in to Facebook. You can launch a
      // login dialog with a user gesture, but the user may have
      // to log in to Facebook before authorizing your application.
    }
    thisObj._isLoggedInViaFacebook.next(false);
  });
}

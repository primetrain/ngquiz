import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LoginService} from "./_shared/login.service";
import {OAuthService} from "angular-oauth2-oidc";
import {RouterTestingModule} from "@angular/router/testing";

let noopFn: () => void = () => {
};

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const oAuthService = jasmine.createSpyObj('OAuthService', ['loadDiscoveryDocument', 'tryLogin', 'hasValidAccessToken',
    'silentRefresh', 'getIdentityClaims', 'setupAutomaticSilentRefresh', 'getAccessToken', 'initImplicitFlow',
    'logOut']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        LoginService,
        {
          provide: OAuthService,
          useValue: oAuthService
        }
      ]
    }).compileComponents();

    const callbackPatternObj = {
      then(callback) {
        return callback();
      }
    };

    oAuthService.loadDiscoveryDocument.and.returnValue(callbackPatternObj);
    oAuthService.tryLogin.and.returnValue(callbackPatternObj);
    oAuthService.silentRefresh.and.returnValue(callbackPatternObj);
    oAuthService.hasValidAccessToken.and.returnValue(false);
    oAuthService.getIdentityClaims.and.returnValue({
      "name": "some_username"
    });
    oAuthService.setupAutomaticSilentRefresh.and.callFake(noopFn);

    oAuthService.loadDiscoveryDocument.calls.reset();
    oAuthService.tryLogin.calls.reset();
    oAuthService.hasValidAccessToken.calls.reset();
    oAuthService.silentRefresh.calls.reset();
    oAuthService.getIdentityClaims.calls.reset();
    oAuthService.setupAutomaticSilentRefresh.calls.reset();
  });

  it('should correctly initialize AppComponent', () => {
    createComponent();
    fixture.detectChanges();

    expect(oAuthService.loadDiscoveryDocument).toHaveBeenCalled();
    expect(oAuthService.tryLogin).toHaveBeenCalled();
    expect(oAuthService.hasValidAccessToken).toHaveBeenCalled();
    expect(oAuthService.silentRefresh).toHaveBeenCalled();
    expect(oAuthService.getIdentityClaims).toHaveBeenCalled();
    expect(oAuthService.setupAutomaticSilentRefresh).toHaveBeenCalled();

    expect(component.username).toEqual("some_username");
  });

  it('login should trigger oauth service', () => {
    createComponent();
    fixture.detectChanges();

    component.login();

    expect(oAuthService.initImplicitFlow).toHaveBeenCalled();
  });

  it('logout should trigger oauth service', () => {
    createComponent();
    fixture.detectChanges();

    component.logout();

    expect(oAuthService.logOut).toHaveBeenCalled();
  });

  it('refresh should trigger oauth service', () => {
    createComponent();
    fixture.detectChanges();

    component.login();

    expect(oAuthService.silentRefresh).toHaveBeenCalled();
  });

  it('token should return oauth service invocation', () => {
    createComponent();
    fixture.detectChanges();

    let a = component.token;

    expect(oAuthService.getAccessToken).toHaveBeenCalled();
  });

  it('claims should return oauth service invocation', () => {
    createComponent();
    fixture.detectChanges();

    let a = component.token;

    expect(oAuthService.getIdentityClaims).toHaveBeenCalled();
  });

  it('submitGoogleLogin should call oauth service initImplicitFlow', () => {
    createComponent();
    fixture.detectChanges();

    component.submitGoogleLogin();

    expect(oAuthService.initImplicitFlow).toHaveBeenCalled();
  });

  function createComponent() {
    fixture = TestBed.createComponent(AppComponent);

    component = fixture.debugElement.componentInstance;
  }

});

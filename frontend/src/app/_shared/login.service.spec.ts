import {LoginService} from "./login.service";
import {TestBed} from "@angular/core/testing";

describe('LoginService', () => {

  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService
      ]
    }).compileComponents();

    service = TestBed.get(LoginService);
  });

  it('should set state of the user login', () => {
    // Setting user is logged in
    service.loggedIn = false;

    service.Authenticate = true;

    expect(service.loggedIn).toBe(true);

    service.Authenticate = false;

    expect(service.loggedIn).toBe(false);

  });

  it('should return state of the user login', () => {
    // Setting user is logged in
    service.loggedIn = true;

    expect(service.isAuthenticated).toBe(true);

    // Setting user is logged out
    service.loggedIn = false;

    expect(service.isAuthenticated).toBe(false);
  })
});

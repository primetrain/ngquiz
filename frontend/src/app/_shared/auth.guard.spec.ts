// import {LoginService} from "./login.service";
// import {AuthGuard} from "./auth.guard";
// import {RouterTestingModule} from "@angular/router/testing";
// import {TestBed} from "@angular/core/testing";
// import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
// import {Observable} from "rxjs/index";
//
// describe('AuthGuard', () => {
//
//   let service: LoginService,
//     guard: AuthGuard,
//     router: Router;
//
//   const next: ActivatedRouteSnapshot = null,
//     state: RouterStateSnapshot = null;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       providers: [
//         LoginService,
//         AuthGuard,
//         {
//           provide: Router,
//           useValue: {
//             navigate() {
//             }
//           }
//         }
//       ]
//     }).compileComponents();
//
//     service = TestBed.get(LoginService);
//     guard = TestBed.get(AuthGuard);
//     router = TestBed.get(Router);
//
//     spyOn(router, 'navigate').and.stub();
//   });
//
//   it('should return observable of true without navigation', done => {
//     // Setting user is logged in
//     service.loggedIn = true;
//
//     (<Observable<boolean>>guard.canActivate(next, state)).subscribe(res => {
//
//       expect(router.navigate).not.toHaveBeenCalled();
//       expect(res).toBe(true);
//
//       done();
//     });
//
//   });
//
//   it('should return observable of false and navigate via router', done => {
//     // Setting user is logged in
//     service.loggedIn = false;
//
//     (<Observable<boolean>>guard.canActivate(next, state)).subscribe(res => {
//
//       expect(router.navigate).toHaveBeenCalledWith([""]);
//       expect(res).toBe(false);
//
//       done();
//     });
//   })
// });

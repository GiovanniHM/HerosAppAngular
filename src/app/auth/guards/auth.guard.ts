import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean > | boolean {
      // if (this.authService.auth.id) {
      //   return true;
      // }
      // console.log('Ban - CanActivate');
      // return false;
    return this.authService.verificaAuth();

  }

  constructor(
    private authService: AuthService,
    private router: Router

    ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    //Funciona bien por que retorna el mismo valor que canLoad
    return this.authService.verificaAuth()
    .pipe(
      tap(estaAuth => {
        if(!estaAuth){
          this.router.navigate(['./auth/login']);
        }
      })
    );

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log('Ban - canLoad');
    // return false;
  }
}

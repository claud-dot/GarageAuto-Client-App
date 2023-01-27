import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private authService : AuthService , private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const roleUser = this.authService.RoleAccess();
      const url = this.authService.roleUrl.find((rolDefaultUrl : any)=> rolDefaultUrl.role == roleUser );
    if(this.authService.RoleAccess()==='Client'){
      return true;
    }else{
      this.router.navigate([url?.urlDefault]);
      return false;
    }
  } 
}


@Injectable({
  providedIn: 'root'
})
export class AtelierGuard implements CanActivate{

  constructor(private authService : AuthService , private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roleUser = this.authService.RoleAccess();
    const url = this.authService.roleUrl.find((rolDefaultUrl : any)=> rolDefaultUrl.role == roleUser );
    if(this.authService.RoleAccess()==='Responsable Atelier'){
      return true;
    }else{
      this.router.navigate([url?.urlDefault]);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class FinancierGuard implements CanActivate{

  constructor(private authService : AuthService , private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roleUser = this.authService.RoleAccess();
    const url = this.authService.roleUrl.find((rolDefaultUrl : any)=> rolDefaultUrl.role == roleUser );
    if(this.authService.RoleAccess()==='Responsable Financier'){
      return true;
    }else{
      this.router.navigate([url?.urlDefault]);
      return false;
    }
  }
}

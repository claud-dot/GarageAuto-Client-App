import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private authService : AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.RoleAccess()==='Client'){
      return true;
    }else{
      return false;
    }
  } 
}


@Injectable({
  providedIn: 'root'
})
export class AtelierGuard implements CanActivate{

  constructor(private authService : AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.RoleAccess()==='Responsable Atelier'){
      return true;
    }else{
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class FinancierGuard implements CanActivate{

  constructor(private authService : AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.RoleAccess()==='Responsable Financier'){
      return true;
    }else{
      return false;
    }
  }
}

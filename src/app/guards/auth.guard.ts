import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,Router,RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService : AuthService ,private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isLoggedIn()){
           return true;
        }else{
           this.router.navigate(['login']);
           return false;
        }
    }
    
}


@Injectable({
    providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

    constructor(private authService : AuthService ,private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isLoggedIn()){
            this.router.navigate(['home']);
           return false;
        }else{
           return true;
        }
    }
    
}

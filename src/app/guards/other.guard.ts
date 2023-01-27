import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceGuard implements CanActivate {

  constructor(private authService : AuthService ,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const roleUser = this.authService.RoleAccess();
      const urlDefault = this.authService.roleUrl.find((rolDefaultUrl : any)=> rolDefaultUrl.role == roleUser );
      console.log(urlDefault);
      
      if(roleUser==='Responsable Financier' || roleUser==='Client'){
        return true;
     }else{
        this.router.navigate([urlDefault?.urlDefault]);
        return false;
     }
  }
  
}

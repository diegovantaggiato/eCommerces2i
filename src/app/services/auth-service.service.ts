import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{

  token;
  constructor( private router: Router ) { }


  getAccounts() {
    return firebase.database().ref('accounts')
  }

  // iscriviti
  addAccounts(key){
    firebase.database().ref('accounts/' + key.uid).set(key)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    this.token = localStorage.getItem('token')
    if(this.token) return true
    this.router.navigate(['/login'])
    return false ;
  }
}

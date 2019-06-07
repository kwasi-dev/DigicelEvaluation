import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {HttpClient, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router, private  http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionId = this.storage.get('session_id');
    if (sessionId == null) {
      this.router.navigate(['login']);
      return false;
    }
    const parm = new HttpParams().set('id', sessionId);

    this.http.get('http://127.0.0.1:5000/user',
      {headers: { 'Content-Type': 'application/json' },
        params: parm
      }
    ).subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        if (result.status === false) {
          this.storage.remove('session_id');
          this.router.navigate(['login']);
          return false;
        }
      }, it => {
        this.storage.remove('session_id');
        this.router.navigate(['login']);
        return false;
      }
    );

    return true;
  }
}

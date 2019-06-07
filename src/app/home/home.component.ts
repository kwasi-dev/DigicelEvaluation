import {Component, Inject, OnInit} from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NavsvcService} from '../navsvc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router, private  http: HttpClient, private nav: NavsvcService) { }

  private name = '';

  ngOnInit() {
    const sessionId = this.storage.get('session_id');
    if (sessionId == null) {
      this.router.navigate(['login']);
      return;
    }
    const parm = new HttpParams().set('id', sessionId);

    this.http.get('http://127.0.0.1:5000/user',
      {headers: { 'Content-Type': 'application/json' },
        params: parm
      }
    ).subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        this.name = result.first_name + ' ' + result.last_name;
        console.log(result);
      }, it => {
        console.log(it);
        alert('An error occurred, please try again later');
      }
    );
  }

  logout() {
    this.storage.remove('session_id');
    this.router.navigate(['login']);
  }

  toggleNavbar() {
    this.nav.toggle();
  }
}

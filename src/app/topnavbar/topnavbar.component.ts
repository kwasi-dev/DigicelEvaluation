import {Component, Inject, OnInit} from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NavsvcService} from '../navsvc.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit {
  name = '';
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public nav: NavsvcService, private http: HttpClient, private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.setupBar();
  }

  logout() {
    const sessionId = this.storage.get('session_id');
    this.rest.logout(sessionId).subscribe();
    this.storage.remove('session_id');
    this.router.navigate(['login']);
  }

  setupBar() {
    const sessionId = this.storage.get('session_id');
    this.rest.validateSession(sessionId).subscribe(res => {
      const result = JSON.parse(JSON.stringify(res));
      if (result.status) {
        this.name = result.first_name + ' ' + result.last_name;
      } else {
        console.log(result);
        alert('Your session has expired. Please login again!');
        this.router.navigate(['login']);
      }
    },
      err => {
        console.log(err);
        alert('Your session has expired. Please login again!');
        this.router.navigate(['login']);
      });
  }

  toggleNavbar() {
    this.nav.toggle();
  }
}

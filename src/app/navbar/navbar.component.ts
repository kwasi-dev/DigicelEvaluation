import {Component, Inject, OnInit} from '@angular/core';
import {NavsvcService} from '../navsvc.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../rest.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
              public nav: NavsvcService, private rest: RestService, private router: Router) {}

  ngOnInit() {}

  toggleSidebar() {
    this.nav.toggle();
  }

  logout() {
    const sessionId = this.storage.get('session_id');
    this.rest.logout(sessionId).subscribe();
    this.storage.remove('session_id');
    this.router.navigate(['login']);
  }
}

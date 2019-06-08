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
  showModal = false;

  firstName: string;
  lastName: string;
  email: string;
  contact: string;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public nav: NavsvcService, private http: HttpClient, private rest: RestService, private router: Router) {
  }
  ngOnInit() {
  }


  toggleSidebar() {
    this.nav.toggle();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  logout() {
    const sessionId = this.storage.get('session_id');
    this.rest.logout(sessionId).subscribe();
    this.storage.remove('session_id');
    this.router.navigate(['login']);
  }
  createCustomer() {
    if (this.firstName === undefined || this.lastName === undefined || this.email === undefined || this.contact === undefined) {
      alert('Please enter all fields');
      return;
    }
    this.http.post('http://127.0.0.1:5000/customer', {
        first_name : this.firstName,
        last_name : this.lastName,
        email : this.email,
        contact : this.contact
      },
      {headers: { 'Content-Type': 'application/json' }}
    ).subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        if (result.status) {
          alert('Customer created successfully');
          this.showModal = false;
        } else {
          alert (result.message);
        }
      },
      it => {
        console.log(it);
        alert('An error occurred, please try again later');
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import {NavsvcService} from "../navsvc.service";
import {HttpClient} from "@angular/common/http";

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

  constructor(public nav: NavsvcService, private http: HttpClient,) {
  }
  ngOnInit() {
  }


  toggleSidebar() {
    this.nav.toggle();
  }

  toggleModal() {
    this.showModal = !this.showModal;
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

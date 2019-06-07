import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  contact: string;

  showModal = false;

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  toggleModal = () => {
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

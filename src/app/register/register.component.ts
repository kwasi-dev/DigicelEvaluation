import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  fName: string;
  lName: string;
  confirmPassword: string;
  email: string;

  constructor(private http: HttpClient, private router: Router, private rest: RestService) { }

  ngOnInit() {
  }

  register(): void {
    if (this.email === undefined || this.confirmPassword === undefined || this.password === undefined
      || this.username === undefined || this.fName === undefined || this.lName === undefined) {
      alert('Please enter all fields!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.rest.register(this.username, this.password, this.fName, this.lName, this.email)
    .subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        if (result.status) {
          if (confirm('User successfully created! Please login now')) {
            this.router.navigate(['login']);
          }
        } else {
          alert (result.message);
        }
      },
      () => {
        alert('An error occurred, please try again later');
      }
    );
  }
}

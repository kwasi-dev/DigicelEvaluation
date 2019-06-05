import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
  }

  register(): void {
    if (this.email === undefined || this.confirmPassword === undefined || this.password === undefined || this.username === undefined) {
      alert('Please enter all fields!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.http.post('http://127.0.0.1:5000/register', {
      username: this.username,
      password: this.password,
      email: this.email
    },
      {headers: { 'Content-Type': 'application/json' }}
      ).subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        console.log(result);
        if (result.status) {
          if (confirm('User successfully created! Please login now')){
            this.router.navigate(['login']);
          }
        } else {
          alert (result.message);
        }
        console.log(res);
      },
      it => {
        alert('An error occurred, please try again later');
      }
    );
  }
}

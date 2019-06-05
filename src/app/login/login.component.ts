import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  username: string;
  password: string;
  ngOnInit() {
  }
  login(): void {
    if (this.password === undefined || this.username === undefined) {
      alert('Please enter all fields!');
      return;
    }

    this.http.post('http://127.0.0.1:5000/login', {
        username: this.username,
        password: this.password
      },
      {headers: { 'Content-Type': 'application/json' }}
    ).subscribe(
      res => {
        const result = JSON.parse(JSON.stringify(res));
        console.log(result);
        if (result.status) {
          // TODO: store login token
          this.router.navigate(['home']);
          console.log(result);
        } else {
          alert (result.message);
        }
        console.log(res);
      },
      it => {
        console.log(it);
        alert('An error occurred, please try again later');
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
  username: string;
  password: string;
  ngOnInit() {
  }
  login(): void {
    if (this.username === 'logan20') {
      this.router.navigate(['home']);
    } else {
      alert ('TODO: login functionality: Username=' + this.username + ' Password= ' + this.password);
    }
  }

}

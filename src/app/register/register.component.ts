import {Component, Input, OnInit} from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  register(): void {
    if (this.email === undefined || this.confirmPassword === undefined || this.password === undefined || this.username === undefined) {
      alert('Please enter all fields!');
      return;
    }
    if (this.password !== this.confirmPassword){
      alert('Passwords do not match!');
      return;
    }
    alert ('TODO: register functionality: Username=' + this.username + ' Password= ' + this.password);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NavsvcService} from '../navsvc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private nav: NavsvcService) { }

  ngOnInit() {}

  toggleNavbar() {
    this.nav.toggle();
  }
}

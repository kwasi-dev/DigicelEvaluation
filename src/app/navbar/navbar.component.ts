import { Component, OnInit } from '@angular/core';
import {NavsvcService} from "../navsvc.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public nav: NavsvcService) {
  }


  ngOnInit() {
  }

  toggleSidebar() {
    this.nav.toggle();
  }

}

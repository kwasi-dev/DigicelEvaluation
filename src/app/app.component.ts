import {Router} from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router) { }

  ngOnInit() {
      const sessionId = this.storage.get('session_id');
      if (sessionId == null) {
        this.router.navigate(['login']);
        return;
      }
      this.router.navigate(['home']);
  }


}

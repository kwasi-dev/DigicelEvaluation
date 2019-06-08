import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://127.0.0.1:5000';
const LOGIN_URL = BASE_URL + '/login';
const REGISTER_URL = BASE_URL + '/register';
const LOGOUT_URL = BASE_URL + '/logout';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  login(name, pass) {
    return this.http.post(LOGIN_URL, {
        username: name,
        password: pass
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
  }

  register(uName, pass, fName, lName, mail) {
    return this.http.post(REGISTER_URL, {
        username: uName,
        password: pass,
        f_name: fName,
        l_name: lName,
        email: mail,
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
  }

  logout(session) {
    const logoutURL = `${LOGOUT_URL}/${session}`;
    return this.http.delete(logoutURL);
  }
}

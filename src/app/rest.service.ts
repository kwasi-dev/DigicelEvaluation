import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://127.0.0.1:5000';
const LOGIN_URL = BASE_URL + '/login';
const REGISTER_URL = BASE_URL + '/register';
const LOGOUT_URL = BASE_URL + '/logout';
const SESSION_URL = BASE_URL + '/user';
const CUSTOMER_URL = BASE_URL + '/customer';

const HEADER_JSON = {headers: { 'Content-Type': 'application/json' }};

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
      HEADER_JSON
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
      HEADER_JSON
    );
  }

  logout(session) {
    const logoutURL = `${LOGOUT_URL}/${session}`;
    return this.http.delete(logoutURL);
  }

  validateSession(session) {
    const sessionURL = `${SESSION_URL}/${session}`;
    return this.http.get(sessionURL, HEADER_JSON);
  }

  getCustomers() {
    return this.http.get(CUSTOMER_URL, HEADER_JSON);
  }
}

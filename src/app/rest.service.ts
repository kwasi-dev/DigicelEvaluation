import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://127.0.0.1:5000';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  login(name, pass) {
    return this.http.post(BASE_URL + '/login', {
        username: name,
        password: pass
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
  }

  register(uName, pass, fName, lName, mail){
    return this.http.post('http://127.0.0.1:5000/register', {
        username: uName,
        password: pass,
        f_name: fName,
        l_name: lName,
        email: mail,
      },
      {headers: { 'Content-Type': 'application/json' }}
    );
  }
}

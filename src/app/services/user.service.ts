import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { User }       from "../models/User";

import 'rxjs/add/operator/toPromise';


export interface INewUser {
  name: String;
  email: String;
  password: String;
}

export interface IUserLogin {
  email: String;
  password: String;
}

@Injectable()
export class UserService {
  constructor (private http: Http) { }

  signup (user: INewUser): Promise<User> {
    return this.http.post('/api/v1/user/signup',user)
             .toPromise()
             .then((rs) => rs.json() as User);
  }

  signin (user: IUserLogin) : Promise<User> {
    return this.http.post('/api/v1/user/authenticate', user)
              .toPromise()
              .then(rs => rs.json() as User);
  }

  getCurrentUser () : Promise<User> {
    return this.http.get('/api/v1/user')
              .toPromise()
              .then(rs => rs.json() as User);
  }
}
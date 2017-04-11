import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { WallMessage } from '../models/WallMessage';

@Injectable()
export class MessageService {
  constructor (private http: Http) { }

  getMessages() : Promise<WallMessage[]> {
    return this.http
              .get('/api/v1/messages')
              .toPromise()
              .then(rs => rs.json() as WallMessage[]);
  }
}
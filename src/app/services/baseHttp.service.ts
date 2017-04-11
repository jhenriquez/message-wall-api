import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class BaseHTTPService {
  constructor (protected http: Http) { }
}
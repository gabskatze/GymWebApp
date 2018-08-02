import { Injectable } from '@angular/core';
import { Http } from '../../../../node_modules/@angular/http';
import { Customer } from '../models/Customer';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { baseURL } from './Constants';

@Injectable()
export class CustomerService {

  constructor(private http: Http) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get(baseURL + 'customers/')
      .map(res => res.json() || {});
  }

}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { baseURL } from './Constants';
import { Trainer } from '../models/Trainer';

@Injectable()
export class TrainersService {

  constructor(private http: Http) { }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get(baseURL + 'trainers/')
      .map(res => res.json() || {});
  }

  getTrainer(id: number): Observable<Trainer> {
    return this.http.get(baseURL + 'trainers/' + id)
      .map(res => res.json() || {});
  }

}

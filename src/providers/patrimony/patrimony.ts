import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patrimony } from '../../model/patrimony';
import { HOST_API } from './../../app/config';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, RequestOptions, Request, Response, RequestOptionsArgs, Headers } from '@angular/http';
/*
  Generated class for the PatrimonyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatrimonyProvider {

  private host:string;

  constructor(public http: HttpClient) {
    this.host = HOST_API;
  }

  public getByTag(tag:String): Observable<Patrimony> {
    return this.http.get<Patrimony>(`${this.host}/patrimony/${tag}`);
  }

  public save(patrimony: Patrimony): Observable<Patrimony> {
    console.log('send', patrimony);
    return this.http.post<Patrimony>(`${this.host}/patrimony`, patrimony);
  }
}

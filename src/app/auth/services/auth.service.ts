import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl: string = environment.baseUrl
private _auth:Auth | undefined;

get auth(){
  return {...this._auth}
}

  constructor(private htpp: HttpClient) { }

  login(){
    return this.htpp.get<Auth>(`${this.baseUrl}usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token', auth.id))
    );
  }

  verificaAuth(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.htpp.get<Auth>(`${this.baseUrl}usuarios/1`)
    .pipe(
      map(auth =>{
        this._auth = auth;
        console.log('map', this.auth);
        return true;
      })
    );
  }
}

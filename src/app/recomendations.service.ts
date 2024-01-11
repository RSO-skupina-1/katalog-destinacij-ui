import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './seznami/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { stat } from 'fs';
import { Destinacija } from './seznami/models/destinacija';

@Injectable({
  providedIn: 'root'
})
export class RecomendationsService {

  private loggedInUser: string | null = null;
  
  private httpOptions = {
      headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'access-control-allow-origin': 'http://localhost:8082' 
      })
  };
  private url = environment.priporocilniUrl;

  // Observable for login status
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus = this.loginStatusSubject.asObservable();
  private loginUserIdSubject = new BehaviorSubject<number>(-1);
  loginUserId = this.loginUserIdSubject.asObservable();

  private isLoggedin = false;
  private loggedInUserId: number;
  
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
  }

  getRecommendations(userId: number): Observable<Destinacija[]> {
    return this.http.get<Destinacija[]>(this.url + '/' + userId, this.httpOptions);
  }
}

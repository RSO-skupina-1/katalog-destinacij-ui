import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './seznami/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { stat } from 'fs';

@Injectable({   
  providedIn: 'root',
})
export class LoginService {
    private loggedInUser: string | null = null;
    //private headers = new HttpHeaders().set('access-control-allow-origin', 'http://localhost:8083');
    private httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'access-control-allow-origin': 'http://localhost:8083' 
        })
    };
    private url = environment.uporabnikUrl;

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
        console.log("initializing login service")
    }
    login(username: string, password: string): Observable<User> {
        // create a user object
        const user = new User();
        user.username = username;
        user.password = password;
        user.admin = false;
        user.salt = '';
        user.visitedLocations = [];
        user.id = 0;

        return this.http.post<User>(this.url + '/login', JSON.stringify(user), this.httpOptions)
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(this.url + '/' + id, this.httpOptions);
    }

    setLoggedInUser(user: User): void {
        this.loggedInUser = user.username;
        this.loggedInUserId = user.id;
    }

    isLoggedIn(): boolean {
        return this.isLoggedin;
    }

    logout(): void {
        this.loggedInUser = null;
        this.isLoggedin = false;
        this.updateLoginStatus(false, -1);
    }

    getUserId(): number {
        return this.loggedInUserId;
    }

    getLoggedInUser(): string | null {
        return this.loggedInUser;
    }

    // Update login status after successful login
    updateLoginStatus(status: boolean, userId: number): void {
        this.isLoggedin = status;
        if (status) {
            this.loggedInUserId = userId;
        }
        this.loginStatusSubject.next(status);
        this.loginUserIdSubject.next(userId);
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Komentar } from '../models/komentar';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Artikel } from '../models/artikel';

@Injectable()
export class KomentarService {

    private headers = new HttpHeaders().set('access-control-allow-origin', 'http://localhost:8081');
    private url = 'http://localhost:8081/v1/komentar';
    

    constructor(private http: HttpClient) {
    }

    getKomentar(): Observable<Komentar[]> {
        return this.http.get<Komentar[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getKomentarById(id: number): Observable<Komentar> {
        const url = `${this.url}/${id}`;
        return this.http.get<Komentar>(url)
                        .pipe(catchError(this.handleError));
    }

    getKomentarByUserId(id: number): Observable<Komentar[]> {
        const url = `${this.url}/user/${id}`;
        return this.http.get<Komentar[]>(url)
                        .pipe(catchError(this.handleError));
    }

    getKomentarByDestinacijaId(id: number): Observable<Komentar[]> {
        const url = `${this.url}/destinacija/${id}`;
        return this.http.get<Komentar[]>(url)
                        .pipe(catchError(this.handleError));
    }   

    delete(id: number): Observable<void> {
        const url = `${this.url}/${id}`;
        this.http.delete<void>(url, {headers: this.headers})
                        .pipe(
                            catchError(this.handleError)
                        );
        return null;
    }

    create(komentar: Komentar): Observable<Komentar> {
        return this.http.post<Komentar>(this.url, JSON.stringify(komentar), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    update(komentar: Komentar): Observable<Komentar> {
        const url = `${this.url}/${komentar.id}`;
        return this.http.put<Komentar>(url, JSON.stringify(komentar), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}


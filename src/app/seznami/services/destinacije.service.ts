import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Destinacija } from '../models/destinacija';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Artikel } from '../models/artikel';

import { environment } from '../../../environments/environment';

@Injectable()
export class DestinacijeService {

    private headers = new HttpHeaders().set('access-control-allow-origin', 'http://localhost:8080');
    private url = environment.katalogUrl;
    

    constructor(private http: HttpClient) {
    }

    getKatalogDestinacij(): Observable<Destinacija[]> {
        return this.http.get<Destinacija[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getDestinacija(id: number): Observable<Destinacija> {
        const url = `${this.url}/${id}`;
        return this.http.get<Destinacija>(url)
                        .pipe(catchError(this.handleError));
    }

    getNearestDestinacije(name: string, offset: number, limit: number): Observable<Destinacija[]> {
        const url = `${this.url}/nearestByName/${name}/${offset}/${limit}`;
        return this.http.get<Destinacija[]>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(seznamId: number, artikel: Artikel): Observable<Artikel> {
        return this.http.post<Artikel>(this.url + '/' + seznamId + '/artikli', JSON.stringify(artikel), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}


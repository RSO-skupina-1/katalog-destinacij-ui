import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {Destinacija} from './models/destinacija';
import {DestinacijeService} from './services/destinacije.service';
import { Komentar } from './models/komentar';
import { KomentarService } from './services/komentar.service';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
    moduleId: module.id,
    selector: 'destinacija-podrobnosti',
    templateUrl: 'destinacija-podrobnosti.component.html',
    providers: [DestinacijeService, KomentarService],
    styleUrls: ['./destinacija-podrobnosti.component.css'],
})
export class DestinacijaPodrobnostiComponent implements OnInit {
    destinacija: Destinacija;
    komentarji: Komentar[];
    ocena: string;
    dates: string[];

    constructor(private destinacijaService: DestinacijeService,
                private komentarService: KomentarService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => this.destinacijaService.getDestinacija(params['id'])))
            .subscribe(destinacija => this.destinacija = destinacija);
        
        this.route.params.pipe(
            switchMap((params: Params) => this.komentarService.getKomentarByDestinacijaId(params['id'])))
            .subscribe(komentarji => {
                this.komentarji = komentarji;
                this.ocena = this.calculateAverageOcena(komentarji);
            });
    }

    calculateAverageOcena(komentarji: Komentar[]): string {
        if (komentarji.length === 0) {
            return "2.5";
        }

        const sum = komentarji.reduce((total, komentar) => total + komentar.ocena, 0);
        let average = sum / komentarji.length;
        average = average < 5 ? average : 5;
        
        return average.toFixed(1);
    }

    formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    nazaj(): void {
        this.router.navigate(['destinacije']);
    }
}

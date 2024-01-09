import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { Destinacija } from './models/destinacija';
import { DestinacijeService } from './services/destinacije.service';

@Component({
    moduleId: module.id,
    selector: 'vse-destinacije',
    templateUrl: 'destinacije.component.html',
    styleUrls: ['./destinacije.component.css'],
})
export class DestinacijeComponent implements OnInit {
    destinacije: Destinacija[];
    destinacija: Destinacija;

    constructor(private destinacijaService: DestinacijeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getSeznami();
    }

    getSeznami(): void {
        this.destinacijaService
            .getKatalogDestinacij()
            .subscribe(seznami => this.destinacije = seznami);
    }

    naPodrobnosti(destinacija: Destinacija): void {
        this.destinacija = destinacija;
        this.router.navigate(['/destinacije/', this.destinacija.id]);
    }

    delete(seznam: Destinacija): void {
        this.destinacijaService
            .delete(seznam.id)
            .subscribe(seznamId => this.destinacije = this.destinacije.filter(s => s.id !== seznamId));
    }

}

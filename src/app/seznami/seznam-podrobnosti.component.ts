import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import { switchMap } from 'rxjs/operators';

import {Destinacija} from './models/destinacija';
import {DestinacijeService} from './services/destinacije.service';

@Component({
    moduleId: module.id,
    selector: 'seznam-podrobnosti',
    templateUrl: 'seznam-podrobnosti.component.html'
})
export class SeznamPodrobnostiComponent implements OnInit {
    destinacija: Destinacija;

    constructor(private destinacijaService: DestinacijeService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        console.log(this.route.params['id'])
       this.route.params.pipe(
            switchMap((params: Params) => this.destinacijaService.getDestinacija(params['id'])))
            .subscribe(destinacija => this.destinacija = destinacija);
    }

    dodajArtikel(): void {
        this.router.navigate(['destinacije/' + this.destinacija.id + '/dodaj']);
    }

    nazaj(): void {
        this.router.navigate(['destinacije']);
    }
}

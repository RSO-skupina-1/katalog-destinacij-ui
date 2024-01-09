import {Component} from '@angular/core';
import { LoginService } from './login.service';

@Component({
    moduleId: module.id,
    selector: 'prpo-app',
    template: `
        <!--<h1>{{naslov}}</h1>-->
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    naslov = 'Katalog destinacij';
}

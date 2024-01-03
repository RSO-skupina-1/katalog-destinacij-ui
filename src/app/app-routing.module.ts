import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DestinacijeComponent} from './seznami/destinacije.component';
import {DestinacijaPodrobnostiComponent} from './seznami/destinacija-podrobnosti.component';
import { ArtikelDodajComponent } from './seznami/artikel-dodaj.component';

const routes: Routes = [
    {path: '', redirectTo: '/destinacije', pathMatch: 'full'},
    {path: 'destinacije', component: DestinacijeComponent},
    {path: 'destinacije/:id', component: DestinacijaPodrobnostiComponent},
    {path: 'destinacije/:id/dodaj', component: ArtikelDodajComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

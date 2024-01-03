import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SeznamiComponent} from './seznami/seznami.component';
import {SeznamPodrobnostiComponent} from './seznami/seznam-podrobnosti.component';
import { ArtikelDodajComponent } from './seznami/artikel-dodaj.component';

const routes: Routes = [
    {path: '', redirectTo: '/destinacije', pathMatch: 'full'},
    {path: 'destinacije', component: SeznamiComponent},
    {path: 'destinacije/:id', component: SeznamPodrobnostiComponent},
    {path: 'destinacije/:id/dodaj', component: ArtikelDodajComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

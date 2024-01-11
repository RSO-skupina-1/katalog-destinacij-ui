import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DestinacijeComponent} from './seznami/destinacije.component';
import {DestinacijaPodrobnostiComponent} from './seznami/destinacija-podrobnosti.component';
import { ArtikelDodajComponent } from './seznami/artikel-dodaj.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecomendationsComponent } from './recomendations/recomendations.component';

const routes: Routes = [
    {path: '', redirectTo: '/destinacije', pathMatch: 'full'},
    {path: 'destinacije', component: DestinacijeComponent},
    {path: 'destinacije/:id', component: DestinacijaPodrobnostiComponent},
    {path: 'destinacije/:id/dodaj', component: ArtikelDodajComponent},
    {path: 'search', component: SearchComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'priporocila/:id', component: RecomendationsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

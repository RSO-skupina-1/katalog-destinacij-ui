import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DestinacijeComponent} from './seznami/destinacije.component';
import {ArtikelDodajComponent} from './seznami/artikel-dodaj.component';
import {DestinacijaPodrobnostiComponent} from './seznami/destinacija-podrobnosti.component';
import {DestinacijeService} from './seznami/services/destinacije.service';
import { LoginService } from './login.service';
import { KomentarService } from './seznami/services/komentar.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecomendationsComponent } from './recomendations/recomendations.component';
import { RecomendationsService } from './recomendations.service';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        DestinacijeComponent,
        DestinacijaPodrobnostiComponent,
        ArtikelDodajComponent,
        NavbarComponent,
        SearchComponent,
        CommentListComponent,
        LoginComponent,
        ProfileComponent,
        RecomendationsComponent
    ],
    providers: [DestinacijeService, LoginService, KomentarService, RecomendationsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}


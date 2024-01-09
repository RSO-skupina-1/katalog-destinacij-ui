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
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { LoginComponent } from './login/login.component';


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
        LoginComponent
    ],
    providers: [DestinacijeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}


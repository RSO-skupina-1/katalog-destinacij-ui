import { Component } from '@angular/core';
import { DestinacijeService } from '../seznami/services/destinacije.service';
import { Destinacija } from '../seznami/models/destinacija';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: Destinacija[];
  destinacija: Destinacija;

  constructor(private dataService: DestinacijeService, private router: Router) {} // Inject your data service

  search() {
    if (this.searchQuery.trim() !== '') {
      // Call your backend service to fetch search results
      this.dataService.getNearestDestinacije(this.searchQuery, 0, 10).subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  naPodrobnosti(destinacija: Destinacija): void {
    this.destinacija = destinacija;
    this.router.navigate(['/destinacije/', this.destinacija.id]);
}
}

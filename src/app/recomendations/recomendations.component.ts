import { Component } from '@angular/core';
import { Destinacija } from '../seznami/models/destinacija';
import { RecomendationsService } from '../recomendations.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent {
  destinations: Destinacija[] = [];
  userId: number;

  constructor (private recomendationsService: RecomendationsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });
    this.recomendationsService.getRecommendations(this.userId).subscribe((destinations) => {
      this.destinations = destinations;
    });
  }
}

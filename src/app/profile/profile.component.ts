import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { DestinacijeService } from '../seznami/services/destinacije.service';
import { KomentarService } from '../seznami/services/komentar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../seznami/models/user';
import { DestinacijeComponent } from '../seznami/destinacije.component';
import { Komentar } from '../seznami/models/komentar';
import { Destinacija } from '../seznami/models/destinacija';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isLoggedIn: boolean;
  userId: number;
  visitedDestinations: number[] = [];
  comments: Komentar[] = [];
  dectinations: Destinacija[] = [];

    
  constructor(private loginService: LoginService,
           private destinacijaService: DestinacijeService, 
           private komentarService: KomentarService,
           private route: ActivatedRoute, 
           private router: Router) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });
    
    this.loginService.getUserById(this.userId).subscribe((user) => {
      this.visitedDestinations = user.visitedLocations;
      console.log(this.visitedDestinations)
      //get each destination
      this.visitedDestinations.forEach((destId) => {
        this.destinacijaService.getDestinacija(destId).subscribe((dest) => {
          this.dectinations.push(dest)
        });
      });
    });
    this.komentarService.getKomentarByUserId(this.userId).subscribe((comments) => {
      this.comments = comments;
      this.comments.forEach((comment) => {
        this.loginService.getUserById(comment.user_id).subscribe((user) => {
          comment.username = user.username;
        });
      });
    });
  }


}

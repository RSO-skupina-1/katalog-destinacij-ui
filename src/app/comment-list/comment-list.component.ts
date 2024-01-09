import { Component, OnInit } from '@angular/core';
import { KomentarService } from '../seznami/services/komentar.service';
import { ActivatedRoute } from '@angular/router';
import {Komentar} from '../seznami/models/komentar';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  comments: Komentar[] = [];
  newComment: string = '';
  newRating: number = 0;
  ocena: string;
  isLoggedIn: boolean;
  userId: number;

  dataSubscription: Subscription;

  constructor(private commentService: KomentarService, private loginService: LoginService, private route: ActivatedRoute) {
    
    
  }

  ngOnInit(): void {
    this.getComments();
    this.ocena = this.calculateAverageOcena(this.comments);
    if (!this.dataSubscription || this.dataSubscription.closed) {
      this.dataSubscription = this.loginService.loginStatus.subscribe((status) => {
        this.isLoggedIn = status;
      });
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.loginService.loginUserId.subscribe((id) => {
        this.userId = id;
      }
      );
      this.userId = this.loginService.getUserId();
    }
  }

  getComments(): void {
    const destinacijaId = this.route.snapshot.paramMap.get('id');
    if (destinacijaId) {
      this.commentService.getKomentarByDestinacijaId(Number(destinacijaId)).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

  calculateAverageOcena(komentarji: Komentar[]): string {
    if (komentarji.length === 0) {
        return "2.5";
    }

    const sum = komentarji.reduce((total, komentar) => total + komentar.ocena, 0);
    let average = sum / komentarji.length;
    average = average < 5 ? average : 5;
    
    return average.toFixed(1);
  }

  addComment(): void {
    let komentar = new Komentar();
    komentar.komentar = this.newComment;
    komentar.ocena = this.newRating;
    komentar.user_id = this.loginService.getUserId();
    komentar.ustvarjen = new Date();
    komentar.lokacija_id = Number(this.route.snapshot.paramMap.get('id'));

    this.commentService.create(komentar).subscribe((comment) => {
      this.comments.push(comment);
      this.newComment = '';
      this.newRating = 0;
      this.ocena = this.calculateAverageOcena(this.comments);
    });
    return
  }
}

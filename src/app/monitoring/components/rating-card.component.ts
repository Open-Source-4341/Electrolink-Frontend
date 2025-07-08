import { Component, Input } from '@angular/core';
import { Rating } from '../../monitoring/model/rating';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent {
  @Input() rating!: Rating;
}

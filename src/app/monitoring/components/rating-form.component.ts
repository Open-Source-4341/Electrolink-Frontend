import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RatingService } from '../../monitoring/services/rating.service';
import { Rating } from '../../monitoring/model/rating';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-rating-form',
  templateUrl: 'rating-form.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatLabel
  ],
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent {
  @Input() requestId: string = '';
  @Input() technicianId: string = '';
  @Output() formCompleted = new EventEmitter<void>();

  score: number = 5;
  comment: string = '';
  raterId: string = '';

  constructor(private ratingService: RatingService) {}

  submit(): void {
    const rating: Partial<Rating> = {
      requestId: this.requestId,
      technicianId: this.technicianId,
      score: this.score,
      comment: this.comment,
      raterId: this.raterId
    };

    this.ratingService.create(rating).subscribe(() => {
      this.formCompleted.emit(); // Para cerrar el formulario
    });
  }
}

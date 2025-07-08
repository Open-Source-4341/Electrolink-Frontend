import { Component, Input } from '@angular/core';
import { ReportPhoto } from '../../monitoring/model/report-photo';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-report-photo-card',
  templateUrl: './report-photo-card.component.html',
  imports: [
    MatCardContent,
    MatCard
  ],
  styleUrls: ['./report-photo-card.component.css']
})
export class ReportPhotoCardComponent {
  @Input() photo!: ReportPhoto;
}

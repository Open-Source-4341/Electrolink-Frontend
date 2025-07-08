import { Component, Input } from '@angular/core';
import { Report } from '../../monitoring/model/report';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent {
  @Input() report!: Report;
}

import { Component, Input } from '@angular/core';
import { ServiceOperation } from '../../monitoring/model/service-operation';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-service-operation-card',
  templateUrl: './service-operation-card.component.html',
  imports: [
    MatCard,
    DatePipe,
    MatIcon
  ],
  styleUrls: ['./service-operation-card.component.css']
})
export class ServiceOperationCardComponent {
  @Input() operation!: ServiceOperation;
}

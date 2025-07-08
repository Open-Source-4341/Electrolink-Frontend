import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RequestViewComponent } from '../../component/request-view/request-view.component';

@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RequestViewComponent
  ],
  template: `
    <mat-card>
      <h1>Requests</h1>
      <mat-divider></mat-divider>
      <app-request-view></app-request-view>
    </mat-card>
  `
})
export class RequestPage {}

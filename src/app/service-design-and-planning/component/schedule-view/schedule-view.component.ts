import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleEntity } from '../../model/schedule.entity';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent {
  @Input() schedules: ScheduleEntity[] = [];

  @Output() edit = new EventEmitter<ScheduleEntity>();
  @Output() delete = new EventEmitter<number>();
}

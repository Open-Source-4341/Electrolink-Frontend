import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleEntity } from '../../model/schedule.entity';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {
  @Input() schedule: ScheduleEntity = new ScheduleEntity();
  @Output() formCompleted = new EventEmitter<ScheduleEntity>();
  @Output() cancel = new EventEmitter<void>();


  constructor(private scheduleService: ScheduleService) {}

  onSubmit(): void {
    if (this.schedule.id && this.schedule.id > 0) {
      this.scheduleService.update(this.schedule.id!, this.schedule).subscribe({
        next: () => this.formCompleted.emit(this.schedule), // Emitimos el objeto
        error: err => console.error('Error updating schedule', err)
      });
    } else {
      this.scheduleService.create(this.schedule).subscribe({
        next: () => this.formCompleted.emit(this.schedule), // Emitimos el objeto
        error: err => console.error('Error creating schedule', err)
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ScheduleService } from '../../service/schedule.service';
import { ScheduleEntity } from '../../model/schedule.entity';
import { CreateScheduleComponent } from '../schedule-form/create-schedule.component';
import { ScheduleViewComponent } from '../schedule-view/schedule-view.component';

@Component({
  selector: 'app-schedule-actions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CreateScheduleComponent,
    ScheduleViewComponent
  ],
  templateUrl: './schedule-actions.component.html',
})
export class ScheduleActionsComponent {
  successMessage: string | null = null;
  readonly CREATE_ACTION = 'create';
  readonly SEARCH_ACTION = 'searchByTechnician';

  action: 'create' | 'searchByTechnician' | null = null;

  technicianId = '';
  schedules: ScheduleEntity[] = [];

  @Output() schedulesFound = new EventEmitter<ScheduleEntity[]>(); // ✅ NUEVO

  constructor(private scheduleService: ScheduleService) {}

  searchByTechnician(): void {
    this.scheduleService.getByTechnician(Number(this.technicianId)).subscribe({
      next: (data) => {
        this.schedules = data;
        this.schedulesFound.emit(data); // ✅ EMITIR
      },
      error: () => this.schedules = []
    });
  }

  onScheduleCreated(schedule: ScheduleEntity) {
    this.schedules.push(schedule); // se agrega manualmente
  }

  onDelete(scheduleId: number): void {
    this.scheduleService.delete(scheduleId).subscribe({
      next: () => {
        this.schedules = this.schedules.filter(s => s.id !== scheduleId);
        this.successMessage = 'Horario eliminado correctamente.';

        // Quitar mensaje luego de 3 segundos
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        console.error('Error al eliminar el horario', err);
      }
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { ServiceOperationService } from '../../monitoring/services/service-operation.service';
import { ReportService } from '../../monitoring/services/report.service';
import { ReportPhotoService } from '../../monitoring/services/report-photo.service';
import { RatingService } from '../../monitoring/services/rating.service';
import { ServiceOperation } from '../../monitoring/model/service-operation';
import { Report } from '../../monitoring/model/report';
import { ReportPhoto } from '../../monitoring/model/report-photo';
import { Rating } from '../../monitoring/model/rating';
import { RatingFormComponent } from '../components/rating-form.component';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ReportFormComponent } from '../components/report-form.component';
import {MatDivider} from '@angular/material/divider';
import {ServiceStatus} from '../model/service-status';

@Component({
  selector: 'app-service-monitoring-page',
  templateUrl: './service-monitoring-page.component.html',
  imports: [
    MatCard,
    NgForOf,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    RatingFormComponent,
    NgIf,
    ReportFormComponent,
    MatDivider,
  ],
  styleUrls: ['./service-monitoring-page.component.css']
})
export class ServiceMonitoringPageComponent implements OnInit {
  serviceOperations: ServiceOperation[] = [];

  reportsByRequest: Record<string, Report[]> = {};
  reportPhotos: { [reportId: string]: string } = {};
  ratingsByRequest: Record<string, Rating | null> = {};
  selectedOperationId: string | null = null;
  showReportForm = false;
  selectedRequestId = '';

  constructor(
    private serviceOperationService: ServiceOperationService,
    private reportService: ReportService,
    private reportPhotoService: ReportPhotoService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.loadOperations();
  }

  loadOperations(): void {
    this.serviceOperationService.getAll().subscribe(ops => {
      this.serviceOperations = ops;
      ops.forEach(op => {
        this.loadReportForRequest(op.requestId);
        this.loadRatingForRequest(op.requestId);
      });
    });
  }

  loadReportForRequest(requestId: string): void {
    this.reportService.getByRequestId(requestId).subscribe(reports => {
      this.reportsByRequest[requestId] = reports;
      if (reports.length > 0) {
        reports.forEach(report => this.loadPhotos(report.id));
      }
    });
  }

  loadPhotos(reportId: string): void {
    // Si tienes endpoint de fotos activado, habilita esto:
    // this.reportPhotoService.getByReportId(reportId).subscribe(photos => {
    //   this.reportPhotos[reportId] = photos;
    // });
  }

  loadRatingForRequest(requestId: string): void {
    this.ratingService.getByRequestId(requestId).subscribe(
      ratings => this.ratingsByRequest[requestId] = ratings[0] ?? null,
      () => this.ratingsByRequest[requestId] = null
    );
  }

  selectForRating(op: ServiceOperation): void {
    this.selectedOperationId = op.id;
  }

  onRatingSubmitted(): void {
    if (this.selectedOperationId) {
      const operation = this.serviceOperations.find(op => op.id === this.selectedOperationId);
      if (operation) this.loadRatingForRequest(operation.requestId);
    }
    this.selectedOperationId = null;
  }

  openReportForm(requestId: string): void {
    this.selectedRequestId = requestId;
    this.showReportForm = true;
  }

  onReportFormCompleted(): void {
    this.showReportForm = false;
  }

  updateStatus(operation: ServiceOperation): void {
    const nextStatus: string = this.getNextStatus(operation.currentStatus);

    const confirmed: boolean = confirm(`¿Deseas cambiar el estado de "${operation.currentStatus}" a "${nextStatus}"?`);
    if (!confirmed) return;

    this.serviceOperationService.updateStatus(operation.requestId, nextStatus)
      .subscribe({
        next: () => {
          operation.currentStatus = nextStatus as ServiceStatus;;
          alert('Estado actualizado correctamente');
        },
        error: err => {
          console.error('Error al actualizar estado:', err);
          alert('No se pudo actualizar el estado');
        }
      });
  }

  getNextStatus(currentStatus: ServiceStatus): ServiceStatus {
    switch (currentStatus) {
      case ServiceStatus.PENDING:
        return ServiceStatus.IN_PROGRESS;
      case ServiceStatus.IN_PROGRESS:
        return ServiceStatus.COMPLETED;
      default:
        return currentStatus;
    }
  }

  selectPhoto(reportId: string): void {
    const input = document.getElementById('photoInput-' + reportId) as HTMLInputElement;
    if (input) input.click();
  }

  onPhotoSelected(event: Event, reportId: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.reportPhotos[reportId] = reader.result as string;

      // Aquí puedes enviar el archivo al backend si deseas
      // this.reportPhotoService.upload(reportId, file).subscribe(...)
    };
    reader.readAsDataURL(file);
  }
}

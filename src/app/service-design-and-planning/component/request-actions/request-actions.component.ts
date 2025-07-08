import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RequestService } from '../../service/request.service';
import { RequestEntity } from '../../model/request.entity';
import { CreateRequestComponent } from '../request-form/create-request.component';

@Component({
  selector: 'app-request-actions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CreateRequestComponent
  ],
  templateUrl: './request-actions.component.html',
  styleUrls: ['./request-actions.component.css']
})
export class RequestActionsComponent {
  action: 'create' | 'searchById' | 'searchByClient' | null = null;

  requestId = '';
  clientId = '';
  selectedRequest: RequestEntity | null = null;
  selectedRequests: RequestEntity[] = [];

  constructor(private requestService: RequestService) {}

  searchById(): void {
    this.selectedRequest = null;
    this.selectedRequests = [];

    this.requestService.getById(this.requestId).subscribe({
      next: (res) => this.selectedRequest = res,
      error: () => this.selectedRequest = null
    });
  }

  searchByClient(): void {
    this.selectedRequest = null;
    this.selectedRequests = [];

    this.requestService.getByClientId(this.clientId).subscribe({
      next: (res) => this.selectedRequests = res,
      error: () => this.selectedRequests = []
    });
  }

  onRequestCreated(request: RequestEntity) {
    this.selectedRequest = request;
    this.action = null;
  }

  deleteRequest(): void {
    if (this.selectedRequest?.id) {
      this.requestService.delete(this.selectedRequest.id).subscribe(() => {
        this.selectedRequest = null;
      });
    }
  }

  updateRequest(): void {
    if (this.selectedRequest?.id) {
      this.requestService.update(this.selectedRequest.id, this.selectedRequest).subscribe({
        next: (updated) => {
          this.selectedRequest = updated;
        },
        error: (err) => {
          console.error('Error updating request:', err);
        }
      });
    }
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceService } from '../../service/service.service';
import { ServiceEntity } from '../../model/service.entity';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-service-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit {

  private serviceService = inject(ServiceService);

  services: ServiceEntity[] = [];
  loading = true;

  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(this.serviceService.getAll());
      this.services = data;
    } catch (error) {
      console.error('Error loading services', error);
    } finally {
      this.loading = false;
    }
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServiceService } from '../../service/service.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent {
  private serviceService = inject(ServiceService);
  private authService = inject(AuthenticationService);

  // Campos auxiliares para capturar los strings en inputs
  restrictionDistricts: string = '';
  restrictionDays: string = '';

  message = '';

  service = {
    name: '',
    description: '',
    basePrice: 0,
    estimatedTime: '',
    category: '',
    isVisible: true,
    createdBy: '',
    policy: {
      cancellationFee: 0,
      refundPercentage: 0,
      conditions: ''
    },
    restriction: {
      unavailableDistricts: [] as string[],
      forbiddenDays: [] as string[],
      requiresSpecialCertification: false
    },
    tags: [{ value: '' }],
    components: [{ componentId: '', quantity: 0 }]
  };

  ngOnInit(): void {
    const userId = this.authService.getSignedInUserId();
    this.service.createdBy = userId.toString();
  }

  addTag() {
    this.service.tags.push({ value: '' });
  }

  removeTag(index: number) {
    this.service.tags.splice(index, 1);
  }

  addComponent() {
    this.service.components.push({ componentId: '', quantity: 0 });
  }

  removeComponent(index: number) {
    this.service.components.splice(index, 1);
  }

  async onSubmit() {
    try {
      // Procesar los campos auxiliares como listas
      this.service.restriction.unavailableDistricts = this.restrictionDistricts
        .split(',')
        .map((d: string) => d.trim())
        .filter((d: string) => d);
      this.service.restriction.forbiddenDays = this.restrictionDays
        .split(',')
        .map((d: string) => d.trim())
        .filter((d: string) => d);

      const payload = {
        ...this.service,
        tags: this.service.tags.map(t => ({ name: t.value })),
        components: this.service.components.map(c => ({
          componentId: c.componentId,
          quantity: c.quantity
        })),
        policy: this.service.policy,
        restriction: this.service.restriction
      };

      await firstValueFrom(this.serviceService.create(payload));
      this.message = 'Service created successfully.';
    } catch (err) {
      console.error(err);
      this.message = 'Error creating service.';
    }
  }
}

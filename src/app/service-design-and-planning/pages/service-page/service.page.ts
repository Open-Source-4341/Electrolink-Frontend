import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ServiceViewComponent } from '../../component/service-view/service-view.component';
import { ServiceCreateComponent } from '../../component/service-create/service-create.component';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ServiceViewComponent,
    ServiceCreateComponent
],
  templateUrl: './service-page.html'
})
export class ServicePage {
  viewMode: 'view' | 'create' = 'view';

  toggleView(mode: 'view' | 'create') {
    this.viewMode = mode;
  }
}

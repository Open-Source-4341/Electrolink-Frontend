import { Component } from '@angular/core';
import { RequestActionsComponent } from '../request-actions/request-actions.component';

@Component({
  selector: 'app-request-view',
  standalone: true,
  imports: [RequestActionsComponent],
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent {}

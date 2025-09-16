import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, RouterModule],
  template: `
    <p-card [style]="{ width: '15rem', overflow: 'hidden' }">
      <ng-template #header>
        <img [alt]="activity.title" class="w-full" [src]="activity.imageUrl" />
      </ng-template>
      <ng-template #title>{{ activity.title }}</ng-template>
      <p-tag [value]="activity.category" [severity]="activity.categoryColor" class="mb-2"></p-tag>
      <p>{{ activity.description }}</p>
      <ng-template #footer>
        <div class="flex gap-4 mt-1">
          <p-button 
            label="Ir" 
            class="w-full" 
            styleClass="w-full" 
            [routerLink]="activity.routerLink" />
        </div>
      </ng-template>
    </p-card> 
  `
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivityCardComponent } from '../../share/components/activity-card/activity-card.component';
import { Activity } from '../../share/models/activity.model';
import { activitiesData } from './data/activities';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.html',
  styleUrls: ['./activites.scss'],
  imports: [CommonModule, ActivityCardComponent]
})
export class Activites implements OnInit {
  activities: Activity[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.activities = activitiesData as Activity[];
    console.log(this.activities);
  }

  loadActivities() {
    this.http.get<Activity[]>(activitiesData as any)        
      .subscribe(data => {
        this.activities = data;
      });
  }
}
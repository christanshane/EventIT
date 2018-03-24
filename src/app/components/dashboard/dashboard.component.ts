import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../event-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events:Event[];

  constructor(private eventsService:EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(events =>{
      this.events = events;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../event-model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:Event[];
  event: Event = {
    title:'',
    desc:'',
    organizerName:'',
    organizerId:'',
    venue:'',
    date:'',
  }
  folder:any;

  constructor(private eventsService:EventsService) {
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(events =>{
      this.events = events;
    })
  }

}

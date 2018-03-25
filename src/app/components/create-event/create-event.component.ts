import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'angular-router-animations';
import { Event } from '../../event-model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  animations:[fallIn()],
  host:{'[@fallIn]':''}
})
export class CreateEventComponent implements OnInit {
  event: Event = {
  title:'',
  desc:'',
  organizer:'',
  venue:'',
  date:'',
}

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.eventsService.addEvent(this.event);
  }

}

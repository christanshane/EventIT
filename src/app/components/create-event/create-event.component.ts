import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'angular-router-animations';
import { Event } from '../../event-model';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service'

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
  organizerName:'',
  organizerId:'',
  venue:'',
  date:'',
}

  constructor(private eventsService: EventsService, public auth: AuthService) { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.event.organizerName =  this.auth.authState['displayName'];
    this.event.organizerId =  this.auth.authState['uid'];
    this.eventsService.addEvent(this.event);
  }

}

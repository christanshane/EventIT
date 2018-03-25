import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../event-model';
import { fallIn } from "angular-router-animations";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[fallIn()],
  host:{'[@fallIn]':''}
})
export class DashboardComponent implements OnInit {
  events:Event[];
  uid:any;
  eventsCollection: AngularFirestoreCollection<Event>;
  eventDocument: AngularFirestoreDocument<Event>;

  constructor(private eventsService:EventsService, private auth:AuthService) { 
    this.uid = this.auth.authState['uid'];
  }

  ngOnInit() {
    this.eventsService.getOwnEvents(this.uid).subscribe(events =>{
      this.events = events;
    })
  }

}

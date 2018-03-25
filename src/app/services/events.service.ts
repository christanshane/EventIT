import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Event } from '../event-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {
  eventsCollection: AngularFirestoreCollection<Event>;
  events:Observable<Event[]>;
  eventsDoc:AngularFirestoreDocument<Event>;

  constructor(public angularFirestore:AngularFirestore) { 
    this.eventsCollection = this.angularFirestore.collection('events');
    this.events = this.eventsCollection.snapshotChanges().map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Event;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getEvents(){
     return this.angularFirestore.collection('events').snapshotChanges().map(changes =>{
       return changes.map(a =>{
          const data = a.payload.doc.data() as Event;
          data.id = a.payload.doc.id;
          return data;
       });
     });
   }

   addEvent(event:Event){
     this.eventsCollection.add(event);
   }

   getOwnEvents(uid: String){
     return this.angularFirestore.collection(`events`, (ref) => ref.where(`organizerId`,'==',uid)).snapshotChanges().map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Event;
         data.id = a.payload.doc.id;
         return data;
       });
     });
   }
}

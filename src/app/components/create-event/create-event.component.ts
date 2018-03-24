import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'angular-router-animations';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  animations:[fallIn()],
  host:{'[@fallIn]':''}
})
export class CreateEventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

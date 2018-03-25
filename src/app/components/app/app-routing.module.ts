import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { EventsComponent } from '../events/events.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreateEventComponent } from '../create-event/create-event.component';

import { AuthService } from '../../services/auth.service';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'events', component:EventsComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthService]},
  {path:'create-event', component:CreateEventComponent, canActivate:[AuthService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

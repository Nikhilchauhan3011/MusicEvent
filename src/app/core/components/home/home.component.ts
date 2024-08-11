import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { Event } from '../../interfaces/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  subscription$: Subscription = new Subscription();

  listOfEvents: Event[] = [];

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {

    this.subscription$.add(
      this.apiService.getListOfEventsObservable().subscribe((data: Event[]) => {
        this.listOfEvents = data;
      }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


}



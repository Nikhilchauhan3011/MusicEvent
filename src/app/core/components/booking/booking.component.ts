import { Component } from '@angular/core';
import { RegisteredUserEvents } from '../../interfaces/registeredUser';
import { ApiServicesService } from '../../services/api-services.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  userEvents: RegisteredUserEvents[] = [];

  listOfEvents: RegisteredUserEvents[] = [];

  event: RegisteredUserEvents = <RegisteredUserEvents>{};

  subscription$: Subscription = new Subscription();

  constructor(private bookingApiService: ApiServicesService) {

  }

  loadBooking(): void {


    this.subscription$.add(
      this.bookingApiService.getListOfBookingObservable().subscribe((data: RegisteredUserEvents[]) => {
        this.listOfEvents = data;



        const logInUser = sessionStorage.getItem('email');
        console.log("data");

        console.log(data);

        this.userEvents = this.listOfEvents.filter(eve => eve.uemail == logInUser) || <RegisteredUserEvents>{};

      }));

  }

  ngOnInit(): void {
    this.loadBooking();

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}

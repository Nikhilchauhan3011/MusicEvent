import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../services/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../interfaces/events';
import { Members } from '../../interfaces/member';
import { RegisteredUserEvents } from '../../interfaces/registeredUser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  user: RegisteredUserEvents = <RegisteredUserEvents>{};

  formDetail!: FormGroup;

  eventId: string | null = "";

  eventDetail: Event = <Event>{};

  listOfMembers: Members[] = <Members[]>[];

  subscription$: Subscription = new Subscription();

  constructor(private event: ApiServicesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    /**
     * @param Accessing query parameter
    */

    this.subscription$.add(
      this.route.paramMap.subscribe(params => {
        this.eventId = params.get('id');
      })
    );



    /**
     * @param Accessing event details
     */

    this.subscription$.add(
      this.event.getEventBasedOnIdObservable(<number><any>(this.eventId)).subscribe((data: Event) => {

        this.eventDetail = data;

      }));

    /**
     * @param Accessing this list of members
     */

    this.subscription$.add(
      this.event.getListOfMembersObservable().subscribe((data: Members[]) => {
        this.listOfMembers = data;
      }));


    /**
   * @param Creating new form
   */

    this.formDetail = new FormGroup({

      ufname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      ulname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      uemail: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9+-\.]+@[A-Za-z\.-]+\.[a-z]{2,4}$/)]),
      uphone: new FormControl('', [Validators.pattern(/^[0-9]{10}$/), Validators.minLength(10), Validators.maxLength(10)]),
      uage: new FormControl('', [Validators.required]),
      uTicketType: new FormControl('', [Validators.required]),
      uTicketCount: new FormControl('', [Validators.required]),
      uCity: new FormControl('', [Validators.pattern(/^[a-zA-Z\s]+$/)])

    });



  }

  generateUniqueId(): string {
    return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
  }


  submitData(): void {

    if (this.formDetail.valid) {

      this.user = this.formDetail.value;

      const registrationNumber = this.generateUniqueId();
      this.user.id = registrationNumber;


      // setting the details for the booked user
      this.user.eventName = this.eventDetail.name;
      this.user.eventTime = this.eventDetail.time;
      this.user.eventVenue = this.eventDetail.location;
      this.user.eventImage = this.eventDetail.image;
      this.user.eventLanguage = this.eventDetail.language;
      this.user.paymentStatus = "pending";




      this.event.saveBookings(this.user).subscribe(
        Response => {

          if (Response)
            this.router.navigate(['reg/payment'], {
              "queryParams": {
                "ticketCount": this.formDetail.get('uTicketCount')?.value,
                "ticketPrice": this.formDetail.get('uTicketType')?.value,
                "id": registrationNumber
              },

            });
        }
      );




    } else {

      this.formDetail.markAllAsTouched();

    }

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscription$.unsubscribe();
  }

}

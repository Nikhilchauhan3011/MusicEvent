import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { RegisteredUserEvents } from '../../interfaces/registeredUser';
import { ApiServicesService } from '../../services/api-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  paymentMethod = '';

  registeringUserEvent: RegisteredUserEvents = <RegisteredUserEvents>{};

  myGroup!: FormGroup;

  ticketCount: number = 0;
  totalPayment: number = 0;
  ticketType: string = '';
  id: string = "";

  subscription$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private bookingService: ApiServicesService) {
    this.route.queryParams.subscribe(params => {
      this.ticketType = params['ticketPrice'];
      this.ticketCount = params['ticketCount'];
      this.totalPayment = parseInt(params['ticketCount']) * parseInt(params['ticketPrice']);
      this.id = params['id'];

      this.myGroup = this.fb.group({
        cardPart1: [''],
        cardPart2: [''],
        cardPart3: [''],
        cardPart4: [''],
        cardHolderName: [''],
        expiryDate: [''],
        cvv: [''],
        bankName: [''],
        accountNumber: [''],
        ifscCode: [''],
        upiId: ['']
      });



    });
  }

  ngOnInit(): void {


    this.bookingService.getBookingBasedOnIdObservable(this.id).subscribe(data => {
      this.registeringUserEvent = data;

      console.log(this.registeringUserEvent);
    });
    this.onPaymentMethodChange();

  }



  onPaymentMethodChange(event?: Event): void {
    const selectedMethod = (event?.target as HTMLSelectElement)?.value || this.paymentMethod;

    this.paymentMethod = selectedMethod;

    console.log('Updating validators for payment method:', this.paymentMethod);


    this.updateValidators();
  }


  private updateValidators(): void {


    // Apply validators based on selected payment method
    if (this.paymentMethod === 'card') {

      this.myGroup.get('bankName')?.clearValidators();
      this.myGroup.get('accountNumber')?.clearValidators();
      this.myGroup.get('ifscCode')?.clearValidators();
      this.myGroup.get('upiId')?.clearValidators();

      this.myGroup.get('cardPart1')?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
      this.myGroup.get('cardPart2')?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
      this.myGroup.get('cardPart3')?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
      this.myGroup.get('cardPart4')?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
      this.myGroup.get('cardHolderName')?.setValidators([Validators.required]);
      this.myGroup.get('expiryDate')?.setValidators([Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);
      this.myGroup.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);


      // Reset all validators
      this.myGroup.markAsUntouched();


    } else if (this.paymentMethod === 'netbanking') {

      this.myGroup.get('cardPart1')?.clearValidators();
      this.myGroup.get('cardPart2')?.clearValidators();
      this.myGroup.get('cardPart3')?.clearValidators();
      this.myGroup.get('cardPart4')?.clearValidators();
      this.myGroup.get('cardHolderName')?.clearValidators();
      this.myGroup.get('expiryDate')?.clearValidators();
      this.myGroup.get('cvv')?.clearValidators();
      this.myGroup.get('upiId')?.clearValidators();



      this.myGroup.get('bankName')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]{2,100}$/)]);
      this.myGroup.get('accountNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{9,18}$/)]);
      this.myGroup.get('ifscCode')?.setValidators([Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]);

      // Reset all validators
      this.myGroup.markAsUntouched();

    } else if (this.paymentMethod === 'upi') {


      this.myGroup.get('cardPart1')?.clearValidators();
      this.myGroup.get('cardPart2')?.clearValidators();
      this.myGroup.get('cardPart3')?.clearValidators();
      this.myGroup.get('cardPart4')?.clearValidators();
      this.myGroup.get('cardHolderName')?.clearValidators();
      this.myGroup.get('expiryDate')?.clearValidators();
      this.myGroup.get('cvv')?.clearValidators();


      this.myGroup.get('bankName')?.clearValidators();
      this.myGroup.get('accountNumber')?.clearValidators();
      this.myGroup.get('ifscCode')?.clearValidators();



      this.myGroup.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]);


    }



    // Update form validation status
    this.myGroup.updateValueAndValidity();

  }



  processPayment() {

    console.log("this is proess payement", this.myGroup.valid);


    if (this.myGroup.valid) {
      swal.fire({
        title: `Successfully Registered!!`,
        text: `${this.registeringUserEvent.ufname} ${this.registeringUserEvent.ulname}, Your Registered Id is ${this.registeringUserEvent.id} and email is ${this.registeringUserEvent.uemail}`,
        icon: "success"
      });

      this.registeringUserEvent.paymentStatus = "paid";
      this.subscription$.add(
        this.bookingService.updateBookings(this.registeringUserEvent, this.registeringUserEvent.id).subscribe(data => {

          if (data)
            this.router.navigate(['/']);
        }));



    } else {

      this.myGroup.markAllAsTouched();

    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}

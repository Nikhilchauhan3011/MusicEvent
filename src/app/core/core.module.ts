import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './core-routing.module';

import { RouterLink } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { EventFormComponent } from './components/event-form/event-form.component';
import { BookingComponent } from './components/booking/booking.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TimeFormatPipe } from './components/pipes/time-format.pipe';




@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    HomeComponent,
    EventFormComponent,
    BookingComponent,
    PaymentComponent,
    TimeFormatPipe
  ],
  imports: [

    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  providers: [provideHttpClient()]
})
export class RegistrationModule { }

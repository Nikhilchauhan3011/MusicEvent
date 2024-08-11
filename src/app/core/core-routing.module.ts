import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { BookingComponent } from './components/booking/booking.component';
import { authGuard } from '../guard/auth.guard';

import { PaymentComponent } from './components/payment/payment.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'home',
  redirectTo: './'

},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'forgetPass',
  component: ForgetPasswordComponent
},
{
  path: 'eventform/:id',
  component: EventFormComponent,
  canActivate: [authGuard]

}, {
  path: 'booking',
  canActivate: [authGuard],
  component: BookingComponent

},
{
  path: 'payment',
  component: PaymentComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

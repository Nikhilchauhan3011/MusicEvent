import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9+-\.]+@[A-Za-z\.-]+\.[a-z]{2,4}$/)]]
    });
  }

  submit(): void {
    if (this.forgetPasswordForm.valid) {
      // Handle the forget password logic here
      console.log(this.forgetPasswordForm.value);
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }


  // ...

  navigateToLogin(): void {
    this.router.navigate(['reg/']);
  }
}

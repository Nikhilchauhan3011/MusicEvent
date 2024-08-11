import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {


  signupForm!: FormGroup;


  constructor(private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      ufname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4)]),
      ulname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9+-\.]+@[A-Za-z\.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  signup(): void {

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: { email: string; }) => user.email === this.signupForm.get('email')?.value);

    if (this.signupForm.valid) {
      if (existingUser) {
        this.toastr.error('This email is already exist!!', 'Oops!');
      } else {
        this.toastr.success('Account Created Successfully!', 'Welcome!');


        sessionStorage.setItem("currUser", JSON.stringify(this.signupForm.value));
        users.push({ fname: this.signupForm.get('ufname')?.value, lname: this.signupForm.get('ulname')?.value, email: this.signupForm.get('email')?.value, password: this.signupForm.get('password')?.value });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('token', 'your-token');
        this.router.navigate(['/reg/']);
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}

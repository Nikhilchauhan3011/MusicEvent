import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  user: User = <User>{};

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9+-\.]+@[A-Za-z\.-]+\.[a-z]{2,4}$/)]],
      password: ['', Validators.required]
    });
  }


  /** 
   * @param This method is for login purpose, storing the data into local storage.
  */
  login(): void {

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    this.user.email = this.loginForm.get('email')?.value;
    this.user.password = this.loginForm.get('password')?.value;

    /**
     * @param This is finding the user from users array that i have fetched from users array 
     */
    const user = users.find((user: User) => user.email === this.user.email && user.password === this.user.password);


    if (this.loginForm?.valid) {
      if (user) {

        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('email', user.email);
        this.toastr.success('Login Successfull!', 'Success!');
        this.router.navigate(['../']);

      } else {
        this.toastr.error('Email or Password is incorrect!', 'Oops!');

      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['reg/signup']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router) {

    this.isLoggedIn = this.checkLoginStatus();

  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.isLoggedIn = this.checkLoginStatus();
  }

  checkLoginStatus(): boolean {

    return sessionStorage.getItem('isLoggedIn') !== null;
  }

  login(): void {
    this.router.navigate(['reg/']);
  }

  logout(): void {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.clear();
    this.isLoggedIn = this.checkLoginStatus();
    // Redirect to login page
    this.router.navigate(['reg/']);
  }

}

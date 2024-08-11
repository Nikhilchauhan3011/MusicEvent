import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const token = sessionStorage.getItem('isLoggedIn');
  if (token) {
    return true;
  } else {
    router.navigate(['/reg/']);
    return false;
  }

};

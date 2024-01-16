import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let user = false

export const authGuard: CanActivateFn = (route, state) => {
  if(user) {
    return true
  } else {
    // Redirect to the login page if not authenticated
    const router: Router = inject(Router);
    router.navigate(['/login']);
    return false
  }
};

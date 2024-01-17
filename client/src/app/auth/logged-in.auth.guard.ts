import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const loggedInAuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  if (authService.getUser()) {
    // Redirect to the home page if the user authenticated
    const router: Router = inject(Router);
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};

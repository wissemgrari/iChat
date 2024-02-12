import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  if (authService.getUser()) {
    return true;
  } else {
    // Redirect to the login page if not authenticated
    const router: Router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};

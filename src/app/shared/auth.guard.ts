import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { PinService } from '../services/pin/pin.service';
import { TagService } from '../services/tag/tag.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn !== true) {
    const pinService = inject(PinService);
    const tagService = inject(TagService);

    pinService.clearPins();
    tagService.clearTags();

    window.alert('Access not allowed! You must login first');
    const router = inject(Router);
    router.navigate(['login']);
  }
  return true;
};

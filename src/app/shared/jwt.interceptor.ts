import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);
export const REFRESH_TOKEN_PROTECTED = new HttpContextToken<boolean>(
  () => false
);
export const ACCESS_TOKEN_PROTECTED = new HttpContextToken<boolean>(
  () => false
);

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.context.get(IS_PUBLIC_API)) {

    return next(req);

  } else if (req.context.get(REFRESH_TOKEN_PROTECTED)) {

    const refreshToken = authService.getRefreshToken();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`
      },
    });
    return next(req);

  } else if (req.context.get(ACCESS_TOKEN_PROTECTED)) {
    return authService.getAccessToken().pipe(
      switchMap((token: string | null) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
          });
        }
        return next(req);
      })
    );
  }
  return next(req);
};

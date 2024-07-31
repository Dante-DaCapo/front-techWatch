import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  IS_PUBLIC_API,
  REFRESH_TOKEN_PROTECTED,
  ACCESS_TOKEN_PROTECTED,
} from '../../shared/jwt.interceptor';
import { Observable, Subscription, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken!: string | null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  getConnectedUserInfos(): Observable<UserInfo> {
    return this.http.get<UserInfo>('users/connected-user', {
      context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
    });
  }

  updatePassword(updatePasswordData: {
    currentPassword?: string;
    newPassword?: string;
  }): Subscription {
    return this.http
      .post(`users/update-password`, updatePasswordData, {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .subscribe((response: any) => {
        // TODO check errors
      });
  }

  deleteAccount() {
    this.http
      .delete(`users/connected-user`, {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .subscribe(() => {
        this.performlogout();
      });
  }

  performLogin(loginData: {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  }): Subscription {
    return this.http
      .post(`auth/login`, loginData, {
        context: new HttpContext().set(IS_PUBLIC_API, true),
      })
      .subscribe((response: any) => {
        const refreshToken = response.refresh_token;
        localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
        this.router.navigate(['/dashboard']);
      });
  }

  register(registerData: {
    email?: string;
    password?: string;
    username?: string;
  }): Subscription {
    return this.http
      .post('users/create-user', registerData, {
        context: new HttpContext().set(IS_PUBLIC_API, true),
      })
      .subscribe((response: any) => {
        this.router.navigate(['login']);
      });
  }

  async performlogout() {
    this.http
      .get(`auth/logout`, {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .subscribe();

    localStorage.removeItem('refresh_token');
    this.authToken = null;

    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const refreshToken = this.getLocalToken('refresh');
    if (!refreshToken) {
      return false;
    }
    if (this.jwtHelperService.isTokenExpired(refreshToken)) {
      this.performlogout();
      return false;
    }
    return true;
  }

  getAccessToken(): Observable<string | null> {
    if (!this.isLoggedIn) {
      throw new Error('Must be logged in');
    }
    const accessToken = this.authToken;
    if (!accessToken || this.jwtHelperService.isTokenExpired(accessToken)) {
      return this.refreshAccessToken();
    }
    return of(accessToken);
  }

  getRefreshToken(): string | null {
    if (!this.isLoggedIn) {
      throw new Error('Must be logged in');
    }
    const refreshToken = this.getLocalToken('refresh');
    if (!refreshToken || this.jwtHelperService.isTokenExpired(refreshToken)) {
      localStorage.removeItem('refresh_token');
      this.router.navigate(['/login']);
      return null;
    }
    return refreshToken;
  }

  private refreshAccessToken(): Observable<string | null> {
    if (!this.isLoggedIn) {
      throw new Error('Must be logged in');
    }
    this.authToken = null;
    return this.http
      .post<{ access_token: string }>(
        'auth/get-access-token',
        {
          refresh_token: this.getLocalToken('refresh'),
        },
        {
          context: new HttpContext().set(REFRESH_TOKEN_PROTECTED, true),
        }
      )
      .pipe(
        switchMap((response) => {
          this.authToken = response.access_token;
          return response ? of(this.authToken) : of(null);
        }),
        catchError((error) => {
          console.error('Error while refreshing token', error);
          return of(null);
        })
      );
  }

  private getLocalToken(token: 'access' | 'refresh'): string | null {
    if (token === 'access') {
      return this.authToken;
    }
    // TODO remove from local Storage for real use
    const storedToken = localStorage.getItem(`${token}_token`);
    if (!storedToken) {
      return null;
    }
    return JSON.parse(storedToken);
  }
}

export type UserInfo = {
  id: number;
  email: string;
  username: string;
};

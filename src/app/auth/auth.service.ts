import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as auth0 from 'auth0-js';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppState } from '../app-state.interface';
import { AuthAction } from './auth-action.interface';
import { authActions } from './auth-actions.enum';

(window as any).global = window;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth(environment.auth0);
  public userProfile;

  constructor(public router: Router, private store: Store<AppState>) {}

  private dispatch(action: AuthAction) {
    this.store.dispatch(action);
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    this.dispatch({ type: authActions.LOGOUT, nothing: '' });
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public get isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    let userProfile;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        userProfile = profile;
      }
      cb(err, profile);
    });
  }
}

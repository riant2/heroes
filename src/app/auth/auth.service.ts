import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Auth0Error, Auth0UserProfile } from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { Observable } from 'rxjs';
import { AppState } from '../app-state.interface';
import { AuthAction } from './auth-action.interface';
import { authActions } from './auth-actions.enum';
import { AuthState } from './auth.reducer';

(window as any).global = window;

@Injectable()
export class AuthService {
  private lock = new Auth0Lock('-DyxQVtki6JNIi3SxBq7yB6OAOGho6Hh', 'mierian.eu.auth0.com');
  private state$: Observable<AuthState>;
  private _stateSnapshot: AuthState;

  constructor(private store: Store<AppState>) {
    this.state$ = store.select('auth');
    this.state$.subscribe(state => (this._stateSnapshot = state));

    this.lock.show();
    this.lock.on('authenticated', (authResult: AuthResult) => {
      this.dispatch({ type: authActions.UPDATE_ACCESS_TOKEN, token: authResult.accessToken });
      this.updateUserProfile(authResult.accessToken);
    });
  }

  get stateSnapshot() {
    return this._stateSnapshot;
  }
  get userProfile() {
    return this.stateSnapshot.profile;
  }

  dispatch(action: AuthAction) {
    this.store.dispatch(action);
  }

  updateUserProfile(accessToken: string = '') {
    this.lock.getUserInfo(accessToken || this.stateSnapshot.access_token, (error, profile) => {
      if (error) {
        return this.dispatch({ type: authActions.ERROR });
      }
      this.dispatch({ type: authActions.UPDATE_USERPROFILE, profile });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    this.lock.logout({});
  }
  // auth0 = new auth0.WebAuth(environment.auth0);

  // constructor(public router: Router, private store: Store<AppState>) {}

  // private dispatch(action: AuthAction) {
  //   this.store.dispatch(action);
  // }

  // public login(): void {
  //   this.auth0.authorize();
  // }

  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this.setSession(authResult);
  //       this.router.navigate(['/']);
  //     } else if (err) {
  //       this.router.navigate(['/']);
  //       console.log(err);
  //     }
  //   });
  // }

  // private setSession(authResult): void {
  //   // Set the time that the Access Token will expire at
  //   const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  // }

  // public logout(): void {
  //   this.dispatch({ type: authActions.LOGOUT, nothing: '' });
  //   // Remove tokens and expiry time from localStorage
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  //   // Go back to the home route
  //   this.router.navigate(['/']);
  // }

  // public get isAuthenticated(): boolean {
  //   // Check whether the current time is past the
  //   // Access Token's expiry time
  //   const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
  //   return new Date().getTime() < expiresAt;
  // }

  // public getProfile(cb): void {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     throw new Error('Access Token must exist to fetch profile');
  //   }

  //   let userProfile;
  //   this.auth0.client.userInfo(accessToken, (err, profile) => {
  //     if (profile) {
  //       userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }
}

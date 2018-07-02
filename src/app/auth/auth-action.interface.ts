import { Action } from '@ngrx/store';
import { Auth0UserProfile } from 'auth0-js';

export interface AuthAction extends Action {
  profile?: Auth0UserProfile;
  token?: string;
}

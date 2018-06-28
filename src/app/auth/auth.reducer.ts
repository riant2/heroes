import { Action } from '@ngrx/store';

export interface AuthState {
  access_token: string;
  id_token: string;
  expires_at: Date;
  profile: {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: number;
  };
}

export const authReducer = (state: AuthState, action: Action) => {};

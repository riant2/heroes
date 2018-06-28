import { Action } from '@ngrx/store';
import { environment } from '../environments/environment.prod';
import { AppState } from './app-state.interface';

export const localStorageMetaReducer = (reducer: (AppState, Action) => AppState) => (
  state: AppState,
  action: Action,
) => {
  const nextState = reducer(state, action);
  if (localStorage) {
    localStorage.setItem(`${environment.applicationName}: appState`, JSON.stringify(nextState));
  }
  return nextState;
};

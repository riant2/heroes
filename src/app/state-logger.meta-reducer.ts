import { Action } from '@ngrx/store';
import { environment } from '../environments/environment.prod';
import { AppState } from './app-state.interface';

export function stateLoggerMetaReducer(reducer: (AppState, Action) => AppState) {
  return (state: AppState, action: Action) => {
    const nextState = reducer(state, action);

    console.groupCollapsed(action.type);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
    console.groupEnd();

    return nextState;
  };
}

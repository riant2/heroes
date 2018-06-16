import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { empty, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { AppState } from '../app-state.interface';
import { HeroAction } from './hero-action.interface';
import { heroActions } from './hero-actions.enum';
import { HeroState } from './hero-state.interface';
import { HeroModel } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public state$: Observable<HeroState>;
  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.state$ = store.select<HeroState>('hero');
  }

  private dispatch = (action: HeroAction) => this.store.dispatch(action);

  create = (hero: HeroModel) => {
    this.dispatch({ type: heroActions.CREATE, hero });
    this.http
      .post(`${environment.apiUrl}/hero`, hero)
      .pipe(
        catchError((error: any) => {
          this.dispatch({ type: heroActions.CREATE_ERROR, error });
          return empty();
        }),
      )
      .subscribe((createdHero: HeroModel) =>
        this.dispatch({ type: heroActions.CREATE_SUCCESS, hero: createdHero }),
      );
  };

  updateList = () => {
    this.dispatch({ type: heroActions.UPDATE_LIST });
    this.http
      .get(`${environment.apiUrl}/hero`)
      .pipe(
        catchError((error: any) => {
          this.dispatch({ type: heroActions.UPDATE_LIST_ERROR, error });
          return empty();
        }),
      )
      .subscribe((heroes: HeroModel[]) =>
        this.dispatch({ type: heroActions.UPDATE_LIST_SUCCESS, heroes }),
      );
  };
}

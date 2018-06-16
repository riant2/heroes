import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.interface';
import { HttpClient } from '@angular/common/http';
import { heroActions } from './hero-actions.enum';
import { HeroModel } from './hero.model';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { HeroAction } from './hero-action.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  private dispatch = (action: HeroAction) => this.store.dispatch(action);

  create = (hero: HeroModel) => {
    this.dispatch({ type: heroActions.CREATE, hero });
    this.http
      .post('', hero)
      .pipe(
        catchError((error: any) => {
          this.dispatch({ type: heroActions.CREATE_ERROR, error });
          return empty();
        })
      )
      .subscribe((createdHero: HeroModel) =>
        this.dispatch({ type: heroActions.CREATE_SUCCESS, hero: createdHero })
      );
  }

  updateList = () => {
    this.dispatch({ type: heroActions.UPDATE_LIST });
    this.http
      .get('')
      .pipe(
        catchError((error: any) => {
          this.dispatch({ type: heroActions.UPDATE_LIST_ERROR, error });
          return empty();
        })
      )
      .subscribe((heroes: HeroModel[]) =>
        this.dispatch({ type: heroActions.UPDATE_LIST_SUCCESS, heroes })
      );
  }
}

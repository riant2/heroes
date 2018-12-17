import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { empty, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
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
  public statDescriptions = {
    faction: {},
    class: {},
    name: {},
    stats: {
      level: {},
      power: {},
      attack: {},
      health: {},
      armor: {
        description: 'Damage reduction: ARMOR / (180 + LVL * 25)',
        calc: (armor: number, characterLevel: number) => 180 + characterLevel * 25,
      },
      speed: {
        description:
          'Speed decides order of attack. Each round all character attacks in the order of most speed > least speed.',
      },
      skillDamage: {
        description: 'Added damage for heroes active skill. (100 + skillDamage)%',
        calc: (skillDamage: number) => 100 + skillDamage,
      },
      precision: { description: 'Negates block %' },
      block: { description: '% chance to block. Successful block adds 33% damage reduction.' },
      crit: { description: '% chance to critically strike.' },
      critDamage: {
        description: 'Extra crit damage. Crit damage % = 150% + crit damage * 2',
        calc: (critDamage: number) => 150 + critDamage * 2,
      },
      armorBreak: { description: 'Ignores a % of armor.' },
      controlImmune: { description: '% chance to ignore status effects.' },
      reduceDamage: { description: 'Reduce damage by %, calculated after armor.' },
      holyDamage: { description: 'Extra damage that ignores armor reduction (not reduce damage)' },
    },
  };

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.state$ = store.select<HeroState>('hero');
  }

  private dispatch = (type: heroActions, payload: {} = {}) =>
    this.store.dispatch({ type, ...payload });

  create = (hero: HeroModel) => {
    this.dispatch(heroActions.CREATE_REQUEST, { hero });
    this.http
      .post(`${environment.apiUrl}/heroes`, hero)
      .pipe(
        delay(environment.simulateDelay),
        catchError((error: any) => {
          this.dispatch(heroActions.CREATE_ERROR, { error });
          return empty();
        }),
      )
      .subscribe((createdHero: HeroModel) =>
        this.dispatch(heroActions.CREATE_SUCCESS, { hero: createdHero }),
      );
  };

  update = (hero: HeroModel) => {
    this.dispatch(heroActions.UPDATE_REQUEST, { hero });
    this.http
      .put(`${environment.apiUrl}/heroes`, hero)
      .pipe(
        delay(environment.simulateDelay),
        catchError((error: any) => {
          this.dispatch(heroActions.UPDATE_ERROR, { error });
          return empty();
        }),
      )
      .subscribe((createdHero: HeroModel) =>
        this.dispatch(heroActions.UPDATE_SUCCESS, { hero: createdHero }),
      );
  };

  updateList = () => {
    this.dispatch(heroActions.UPDATE_LIST_REQUEST);
    this.http
      .get(`${environment.apiUrl}/heroes`)
      .pipe(
        delay(environment.simulateDelay),
        catchError((error: any) => {
          this.dispatch(heroActions.UPDATE_LIST_ERROR, { error });
          return empty();
        }),
      )
      .subscribe((heroes: HeroModel[]) =>
        this.dispatch(heroActions.UPDATE_LIST_SUCCESS, { heroes }),
      );
  };

  tempDelete(heroId: string): any {
    this.dispatch(heroActions.TEMP_DELETE, { heroId });
  }

  delete = (heroId: string) => {
    this.dispatch(heroActions.DELETE_REQUEST, { heroId });
    this.http
      .delete(`${environment.apiUrl}/heroes/${heroId}`)
      .pipe(
        delay(environment.simulateDelay),
        catchError((error: any) => {
          this.dispatch(heroActions.DELETE_ERROR, { error });
          return empty();
        }),
      )
      .subscribe((heroes: HeroModel[]) => this.dispatch(heroActions.DELETE_SUCCESS, { heroId }));
  };

  armorDamageReductionPercent(hero: HeroModel) {
    return Math.round((100 * hero.stats.armor) / (180 + hero.stats.level * 25));
  }

  criticalDamageMultiplier(hero: HeroModel) {
    return 150 + hero.stats.critDamage * 2;
  }

  actualCriticalDamage(hero: HeroModel) {
    return (hero.stats.attack * this.criticalDamageMultiplier(hero)) / 100;
  }

  skillDamageMutliplier(hero: HeroModel) {
    return 100 + hero.stats.skillDamage;
  }
}

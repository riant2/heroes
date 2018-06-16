import { Action } from '@ngrx/store';
import { HeroModel } from './hero.model';
export interface HeroAction extends Action {
  heroId?: number;
  hero?: HeroModel;
  heroes?: HeroModel[];
  error?: any;
}

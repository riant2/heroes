import { HeroModel } from './hero.model';

export interface HeroState {
  selectedHeroId: number;
  list: { [id: number]: HeroModel };
}

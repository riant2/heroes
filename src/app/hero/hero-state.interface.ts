import { HeroModel } from './hero.model';

export interface HeroState {
  selectedHeroId: string;
  idHash: { [id: string]: HeroModel };
  list: string[];
  syncing: boolean;
  deleting: { [id: string]: HeroModel };
}

import { HeroAction } from './hero-action.interface';
import { HeroState } from './hero-state.interface';
import { heroActions } from './hero-actions.enum';

const initialState = <HeroState>{
  list: {}
};

export function heroReducer(
  state: HeroState = initialState,
  action: HeroAction
) {
  switch (action.type) {
    case heroActions.CREATE:
      return { ...state, list: { ...state.list, '': action.hero } };
    case heroActions.CREATE_SUCCESS:
      return {
        ...state,
        list: { ...state.list, [action.hero.id]: action.hero, '': undefined }
      };
    default:
      return state;
  }
}

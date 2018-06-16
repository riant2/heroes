import { HeroAction } from './hero-action.interface';
import { heroActions } from './hero-actions.enum';
import { HeroState } from './hero-state.interface';

const initialState: HeroState = {
  selectedHeroId: undefined,
  list: {},
  fetching: false,
};

export function heroReducer(state: HeroState = initialState, action: HeroAction) {
  switch (action.type) {
    case heroActions.CREATE:
      return { ...state, list: { ...state.list, '': action.hero } };
    case heroActions.CREATE_SUCCESS:
      return {
        ...state,
        list: { ...state.list, [action.hero._id]: action.hero, '': undefined },
      };
    case heroActions.UPDATE_LIST:
      return { ...state, fetching: true };
    case heroActions.UPDATE_LIST_SUCCESS:
      const newHeroList = { ...state.list };
      action.heroes.forEach(hero => (newHeroList[hero._id] = hero));
      return { ...state, list: newHeroList, fetching: false };
    case heroActions.UPDATE_LIST_ERROR:
      return { ...state, fetching: false };
    default:
      return state;
  }
}

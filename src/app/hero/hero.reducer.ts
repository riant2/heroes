import { HeroAction } from './hero-action.interface';
import { heroActions } from './hero-actions.enum';
import { HeroState } from './hero-state.interface';

const initialState: HeroState = {
  selectedHeroId: undefined,
  list: {},
  syncing: false,
  deleting: {},
};

export function heroReducer(state: HeroState = initialState, action: HeroAction) {
  switch (action.type) {
    case heroActions.CREATE:
      return { ...state, new: action.hero };
    case heroActions.CREATE_SUCCESS:
      return {
        ...state,
        list: { ...state.list, [action.hero._id]: action.hero },
        new: undefined,
      };

    case heroActions.UPDATE_LIST:
      return { ...state, syncing: true };
    case heroActions.UPDATE_LIST_SUCCESS:
      const newHeroList = { ...state.list };
      action.heroes.forEach(hero => (newHeroList[hero._id] = hero));
      return { ...state, list: newHeroList, syncing: false };
    case heroActions.UPDATE_LIST_ERROR:
      return { ...state, syncing: false };

    case heroActions.UPDATE:
      return { ...state, syncing: true };
    case heroActions.UPDATE_SUCCESS:
      return { ...state, list: { ...state.list, [action.hero._id]: action.hero }, syncing: false };
    case heroActions.UPDATE_ERROR:
      return { ...state, syncing: false };

    case heroActions.DELETE: {
      const { [action.heroId]: deletedHero, ...newList } = state.list;
      return {
        ...state,
        list: newList,
        deleting: { ...state.deleting, [deletedHero._id]: deletedHero },
        updating: true,
      };
    }
    case heroActions.DELETE_SUCCESS: {
      const newDeleting = { ...state.deleting };
      delete newDeleting[action.heroId];
      return {
        ...state,
        deleting: newDeleting,
      };
    }
    case heroActions.DELETE_ERROR: {
      const { [action.heroId]: deletedHero, ...newDeleting } = state.deleting;
      return {
        ...state,
        deleting: newDeleting,
        list: { ...state.list, [deletedHero._id]: deletedHero },
        updating: true,
      };
    }
    default:
      return state;
  }
}

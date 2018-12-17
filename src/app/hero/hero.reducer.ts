import { HeroAction } from './hero-action.interface';
import { heroActions } from './hero-actions.enum';
import { HeroState } from './hero-state.interface';

const initialState: HeroState = {
  selectedHeroId: undefined,
  idHash: {},
  list: [],
  syncing: false,
  deleting: {},
};

export function heroReducer(state: HeroState = initialState, action: HeroAction) {
  switch (action.type) {
    case heroActions.CREATE_REQUEST:
      return { ...state, new: action.hero };
    case heroActions.CREATE_SUCCESS:
      return {
        ...state,
        idHash: { ...state.idHash, [action.hero._id]: action.hero },
        new: undefined,
      };

    case heroActions.UPDATE_LIST_REQUEST:
      return { ...state, syncing: true };
    case heroActions.UPDATE_LIST_SUCCESS:
      const idHash = { ...state.idHash };
      const list = [];
      action.heroes
        .sort((heroA, heroB) => heroA.name.localeCompare(heroB.name))
        .forEach(hero => {
          list.push(hero._id);
          const existing = idHash[hero._id];
          if (!existing || existing.__v < hero.__v) {
            idHash[hero._id] = hero;
          }
        });
      return { ...state, idHash, list };
    case heroActions.UPDATE_LIST_ERROR:
      return { ...state, syncing: false };

    case heroActions.UPDATE_REQUEST:
      return { ...state, syncing: true };
    case heroActions.UPDATE_SUCCESS:
      return {
        ...state,
        idHash: { ...state.idHash, [action.hero._id]: action.hero },
        syncing: false,
      };
    case heroActions.UPDATE_ERROR:
      return { ...state, syncing: false };

    case heroActions.DELETE_REQUEST: {
      const { [action.heroId]: deletedHero, ...newList } = state.idHash;
      return {
        ...state,
        idHash: newList,
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
        idHash: { ...state.idHash, [deletedHero._id]: deletedHero },
        updating: true,
      };
    }

    case heroActions.TEMP_DELETE: {
      const { [action.heroId]: deletedHero, ...newIdHash } = state.idHash;
      return {
        ...state,
        idHash: newIdHash,
        list: state.list.filter(x => x !== action.heroId),
      };
    }

    default:
      return state;
  }
}

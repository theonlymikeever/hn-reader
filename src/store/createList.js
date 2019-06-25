import { combineReducers } from 'redux';
import {
  RECEIVE_STORIES,
  REQUEST_STORIES,
  CACHE_STORIES,
  RECEIVE_NEW_STORIES
} from './actions';

// Create list returns the current list of ids for both active stories (visible)
// as well as all cache stories (all), while handling pre-pending of new stories
const createList = filter => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) return state;
    switch (action.type) {
      case CACHE_STORIES:
        return [...state, ...action.response];
      case RECEIVE_STORIES:
        return [...state, action.response.id];
      case RECEIVE_NEW_STORIES:
        return [action.response.id, ...state];
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case REQUEST_STORIES:
        return true;
      case RECEIVE_STORIES:
        return false;
      case RECEIVE_NEW_STORIES:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  });
};

export default createList;

// Constants below allow us to quickly access the state inside `getStoriesByFilter`
export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;

import { combineReducers } from 'redux';
import {
  RECEIVE_STORIES,
  REQUEST_STORIES,
  CACHE_STORIES,
  RECEIVE_NEW_STORIES
} from './actions';

const createList = filter => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) return state;
    switch (action.type) {
      case CACHE_STORIES:
        return [...state, ...action.response];
      case RECEIVE_STORIES:
        return [...state, ...action.response.map(story => story.id)];
      case RECEIVE_NEW_STORIES:
        return [...action.response.map(story => story.id), ...state];
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
export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;

import { combineReducers } from 'redux'
import { RECEIVE_STORIES, REQUEST_STORIES } from './actions';


const createList = filter => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) return state;
    switch (action.type) {
      case RECEIVE_STORIES:
          return action.response.map(story => story.id);
      default:
          return state;
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type) {
      case REQUEST_STORIES:
        return true;
      case RECEIVE_STORIES:
        return false;
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching
  })
}

  export default createList;
  export const getIds = state => state.ids;
  export const getIsFetching = state => state.isFetching;

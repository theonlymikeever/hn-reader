import { combineReducers } from 'redux';
import storyById, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  visible: createList('visible'),
});

const stories = combineReducers({
  storyById,
  listByFilter
});

// getStoriesByFilter will becomes more flexible once we introduce
// additional story types (i.e. ask and show), allowing us to return the
// list ids with a simple label and then the stories from the lookup table
export const getStoriesByFilter = (state, filter = 'visible') => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getStory(state.storyById, id));
};

export const getIsFetching = (state, filter) => {
  return fromList.getIsFetching(state.listByFilter[filter]);
};

export default stories;

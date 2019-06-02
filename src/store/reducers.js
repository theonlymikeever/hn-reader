import { combineReducers } from 'redux';
import storyById, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  visible: createList('visible'),
  newStories: createList('new')
});

const stories = combineReducers({
  storyById,
  listByFilter
});

export const getVisibleStories = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getStory(state.storyById, id));
};

export const getIsFetching = (state, filter) => {
  return fromList.getIsFetching(state.listByFilter[filter]);
};

export default stories;

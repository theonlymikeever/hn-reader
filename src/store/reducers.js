import { FETCH_SINGLE_STORY, GET_STORIES } from './actions';

const initialState = {
  isFetching: false,
  stories: [],
  fetchedStories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_STORY:
      return {
        ...state,
        stories: [action.story, ...state.stories]
      };

    case GET_STORIES:
      return {
        ...state,
        fetchedStories: [
          ...action.fetchedStories,
          ...state.fetchedStories
        ]
      };

    default:
      return state;
  }
}

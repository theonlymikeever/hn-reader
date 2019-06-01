import { FETCH_SINGLE_STORY, FETCH_STORIES } from './actions';

const initialState = {
  isFetching: false,
  stories: [],
  fetchedStories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_STORY:
      return [...state.stories, action.story];

    case FETCH_STORIES:
      return {
        ...state,
        fetchedStories: [
          ...action.stories.filter(story => !state.fetchedStories.includes(story)), // will improve efficiency
          ...state.fetchedStories
        ]
      };

    default:
      return state;
  }
}

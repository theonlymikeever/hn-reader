import { FETCH_SINGLE_STORY, FETCH_STORIES } from './actions';

const initialState = {
  isFetching: false,
  stories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_STORY:
      return [...state.stories, action.story];

    case FETCH_STORIES:
      return {
        ...state,
        stories: [
          ...action.stories.filter(story => state.stories.indexOf(story) < 0),
          ...state.stories
        ]
      };

    default:
      return state;
  }
}

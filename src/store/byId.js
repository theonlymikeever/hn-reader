import { RECEIVE_STORIES, RECEIVE_NEW_STORIES} from './actions';

// Ideally this needs to be improved to a more DRY implementation
// storyById will create a shallow copy of the state and then insert
// new articles from the api response into that lookup table
const storyById = (state = {}, action) => {
  const nextState = {...state};
  switch(action.type){
    case RECEIVE_STORIES:
        action.response.forEach(story => {
          nextState[story.id] = story
        })
        return nextState;
    case RECEIVE_NEW_STORIES:
        action.response.forEach(story => {
          nextState[story.id] = story
        })
        return nextState;
    default:
      return state;
  }
}

export default storyById;

export const getStory = (state, id) => state[id];

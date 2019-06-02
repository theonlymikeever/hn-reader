import { RECEIVE_STORIES } from './actions';

const storyById = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_STORIES:
        const nextState = {...state};
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

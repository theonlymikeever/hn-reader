import axios from 'axios';

export const FETCH_STORIES = 'FETCH_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = () => {
  return dispatch => {
    axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => dispatch(fetchStories(data.slice(0, 10))))
      .catch(console.log);
  };
};

export const fetchStories = stories => {
  return {
    type: FETCH_STORIES,
    stories: stories
  };
};

export const fetchSingleStory = id => {
  // api call
  return {
    type: FETCH_SINGLE_STORY,
    story: {}
  };
};

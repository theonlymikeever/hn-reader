import axios from 'axios';

export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = filter => {
  return (dispatch, getState) => {
    return axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        let newStories = data.slice(0, 10); // 10 while testing
        // let newStories = data.filter(id => !fetchedStories.includes(id));
        if (newStories.length) {
          return Promise.all(
            newStories.map(id => dispatch(fetchSingleStoryFromApi(id)))
          );
        }
      })
      .then(res => {
        dispatch(receiveStories(filter, res));
      })
      .catch(console.log);
  };
};

export const fetchSingleStoryFromApi = id => {
  return dispatch => {
    return axios
      .get(`${baseURL}/item/${id}.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        dispatch(fetchSingleStory(data));
        return data;
      })
      .catch(console.log);
  };
};

export const receiveStories = (filter, response) => {
  return {
    type: RECEIVE_STORIES,
    filter,
    response
  };
};

export const requestStories = filter => ({
  type: REQUEST_STORIES,
  filter
});

export const fetchSingleStory = story => {
  return {
    type: FETCH_SINGLE_STORY,
    story
  };
};

import axios from 'axios';

export const GET_STORIES = 'GET_STORIES';
export const FETCH_STORIES_FROM_API = 'FETCH_STORIES_FROM_API';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_STORIES_FROM_API })
     axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        let { fetchedStories } = getState();
        let newStories = data.slice(0, 10).filter(id => !fetchedStories.includes(id)); // 10 while testing
        // let newStories = data.filter(id => !fetchedStories.includes(id));
        if (newStories.length)  {
          dispatch(getStories(newStories));
          Promise.all(newStories.map(id => dispatch(fetchSingleStoryFromApi(id))));
        }
      })
      .catch(console.log);
  };
};

export const fetchSingleStoryFromApi = id => {
  return dispatch => {
    axios
      .get(`${baseURL}/item/${id}.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        if (data && data.id) dispatch(fetchSingleStory(data))
        // need to handle when nothing comes back
        else return console.log('no data for', id, 'data:', data)
      })
      .catch(console.log);
  };
};

export const getStories = fetchedStories => {
  return {
    type: GET_STORIES,
    fetchedStories
  };
};

export const fetchSingleStory = story => {
  return {
    type: FETCH_SINGLE_STORY,
    story
  };
};

import axios from 'axios';

export const FETCH_STORIES = 'FETCH_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = () => {
  return (dispatch, getState) => {
    axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        let { fetchedStories } = getState();
        let newStories = data.slice(0, 10).filter(id => !fetchedStories.includes(id));
        // let newStories = data.filter(id => !fetchedStories.includes(id));
        // add new ids to all fetched stories
        dispatch(fetchStories(newStories));
        // fetch individual stories
        newStories.forEach(id => dispatch(fetchSingleStoryFromApi(id)));
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
        if (data.id) dispatch(fetchSingleStory(data))
        // need to handle when nothing comes back
        else console.log('no data for', id, 'data:', data)
      })
      .catch(console.log);
  };
};

export const fetchStories = stories => {
  return {
    type: FETCH_STORIES,
    stories: stories
  };
};

export const fetchSingleStory = story => {
  // api call
  return {
    type: FETCH_SINGLE_STORY,
    story
  };
};

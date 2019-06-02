import axios from 'axios';

export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const CACHE_STORIES = 'CACHE_STORIES';
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = (filter, firstLoad) => {
  return (dispatch, getState) => {
    return axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        const { storyById } = getState();
        if (firstLoad && data) {
          dispatch(cacheStories('all', data)); // cache ids for older
          return Promise.all(
            data.slice(0, 10).map(id => dispatch(fetchSingleStoryFromApi(id)))
          );
        }
        let newStories = data.filter(id => !storyById[id]);
        if (newStories.length) {
          return Promise.all(
            newStories.map(id => dispatch(fetchSingleStoryFromApi(id)))
          );
        }
      })
      .then(res => {
        // need to do error handling
        let stories = res.filter(res => res);
        dispatch(receiveStories(filter, stories));
      })
      .catch(console.log);
  };
};

export const fetchOlderStoriesFromApi = () => {
  return (dispatch, getState) => {
    const { storyById, listByFilter } = getState();
    let allIds = listByFilter['all'].ids;
    let idx = 0;
    let next = [];
    while (next.length < 10 && idx < allIds.length){
      if (!storyById[allIds[idx]]) next.push(allIds[idx])
      idx++;
    }
    return Promise.all(
      next.map(id => dispatch(fetchSingleStoryFromApi(id)))
    ).then(res => {
      let stories = res.filter(res => res);
      dispatch(receiveStories('visible', stories));
    });
  };
};

export const fetchSingleStoryFromApi = id => {
  return dispatch => {
    return axios
      .get(`${baseURL}/item/${id}.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        if (data.id) {
          dispatch(fetchSingleStory(data));
          return data;
        }
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

export const cacheStories = (filter, response) => {
  return {
    type: CACHE_STORIES,
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

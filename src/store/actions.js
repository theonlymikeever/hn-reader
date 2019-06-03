import axios from 'axios';

export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const RECEIVE_NEW_STORIES = 'RECEIVE_NEW_STORIES';
export const CACHE_STORIES = 'CACHE_STORIES';
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const fetchStoriesFromApi = filter => {
  return (dispatch, getState) => {
    const { listByFilter } = getState();
    let allIds = listByFilter['all'].ids;
    let firstLoad = allIds.length > 0 ? false : true;

    return axios
      .get(`${baseURL}/newstories.json?print=pretty`)
      .then(res => res.data)
      .then(data => {
        if (data && firstLoad) {
          dispatch(cacheStories('all', data)); // cache ids for older
          return Promise.all(
            data.slice(0, 30).map(id => dispatch(fetchSingleStoryFromApi(id)))
          );
        } else if (data) {
          let newStories = data.filter(id => !allIds.includes(id));
          if (newStories.length) {
            dispatch(cacheStories('all', newStories));
            return Promise.all(
              newStories.map(id => dispatch(fetchSingleStoryFromApi(id)))
            );
          }
        }
      })
      .then(stories => {
        if (firstLoad && stories) {
          dispatch(receiveStories(filter, stories));
        } else if (stories) {
          dispatch(receiveNewStories(filter, stories));
        }
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
    while (next.length < 10 && idx < allIds.length) {
      if (!storyById[allIds[idx]]) next.push(allIds[idx]);
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

export const receiveNewStories = (filter, response) => {
  return {
    type: RECEIVE_NEW_STORIES,
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

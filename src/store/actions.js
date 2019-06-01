export const FETCH_STORIES = 'FETCH_STORIES';
export const FETCH_SINGLE_STORY = 'FETCH_SINGLE_STORY';

const testData = [
  {
    id: 123,
    title: 'The house that\'s haunted',
    link: 'https://google.com',
    author: 'Luigi',
    timeStamp: new Date().getDate(),
    score: 3445
  },
  {
    id: 124,
    title: 'Plumbing troubles in Mushroom Kingdom',
    link: 'https://facebook.com',
    author: 'Mario',
    timeStamp: new Date().getDate(),
    score: 223
  },
  {
    id: 125,
    title: 'The Art of Beerio-cart',
    link: 'https://news.ycombinator.com/',
    author: 'Peach',
    timeStamp: new Date().getDate(),
    score: 4563
  },
]

const testStory = {
  id: 9999,
  title: 'Difficulties in dating a princess',
  link: 'https://news.ycombinator.com/',
  author: 'Bowser',
  timeStamp: new Date().getDate(),
  score: 12343
}

export const fetchStories = () => {
  // api call + handle massaging of data
  return {
    type: FETCH_STORIES,
    stories: testData
  }
}

export const fetchSingleStory = id => {
  // api call
  return {
    type: FETCH_SINGLE_STORY,
    story: testStory
  }
}

import React from 'react'
import StoryItem from './StoryItem';

const testDate = [
  {
    id: 123,
    title: 'The house that\'s haunted',
    link: 'https://google.com',
    author: 'Luigi',
    timeStamp: new Date().getDate()
  },
  {
    id: 124,
    title: 'Plumbing troubles in Mushroom Kingdom',
    link: 'https://facebook.com',
    author: 'Mario',
    timeStamp: new Date().getDate()
  },
  {
    id: 125,
    title: 'The Art of Beerio-cart',
    link: 'https://news.ycombinator.com/',
    author: 'Peach',
    timeStamp: new Date().getDate()
  },
]

const StoryList = () => (
    <div>
      <ul className="story-list">
        {
          testDate.map(story => <StoryItem key ={story.id} {...story} />)
        }
      </ul>
    </div>
  )

export default StoryList


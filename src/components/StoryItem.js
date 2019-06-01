import React from 'react';
import PropTypes from 'prop-types';

const StoryItem = ({ title, author, timeStamp, link, score }) => {
  return (
    <div className="story-item">
      <a href={link}>{title}</a>
      <span>{score} points</span> by: {author} on: {timeStamp}
    </div>
  );
}

StoryItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.string,
  author: PropTypes.string,
  timeStamp: PropTypes.number,
  score: PropTypes.number
};

export default StoryItem;

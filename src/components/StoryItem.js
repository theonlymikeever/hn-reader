import React from 'react';
import PropTypes from 'prop-types';

const StoryItem = ({ title, by, time, url, score }) => {
  return (
    <div className="story-item">
      <a href={url}>{title}</a>
      <span>{score} points</span> by: {by} on: {time}
    </div>
  );
}

StoryItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  by: PropTypes.string,
  time: PropTypes.number,
  score: PropTypes.number
};

export default StoryItem;

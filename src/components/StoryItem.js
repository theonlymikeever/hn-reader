import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const formatTime = timeStamp => {
  return moment.unix(timeStamp).fromNow()
}

const StoryItem = ({ title, by, time, url, score }) => {
  return (
    <div className="story-item">
      <a href={url}>{title}</a>
      <span>{score} point{score > 1 ? 's' : null}</span> by: {by} {formatTime(time)}
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

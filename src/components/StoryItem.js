import React from 'react';
import PropTypes from 'prop-types';

function StoryItem({ title, author, timeStamp, link }) {
  return (
    <div class="story-item">
      <a href={link}>Title: {title}</a> <br />by: {author} on: {timeStamp}
    </div>
  );
}

StoryItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.string,
  author: PropTypes.string,
  timeStamp: PropTypes.number
};

export default StoryItem;

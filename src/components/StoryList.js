import React from 'react';
import { connect } from 'react-redux';
import {
  fetchStoriesFromApi,
  requestStories,
  fetchOlderStoriesFromApi
} from '../store/actions';
import { getIsFetching, getStoriesByFilter } from '../store/reducers';
import StoryItem from './StoryItem';

function debounce(func, wait) {
  let timeout
  return function(...args) {
    const context = this;
    let later = function(){
      timeout = null;
      func.apply(context, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

class StoryList extends React.Component {
  componentDidMount() {
    // Once mounted we'll grab the initial data
    this.fetchData();
    // We'll periodically check for new stories ever 5s
    setInterval(this.fetchData, 5000);
    // Then we'll bind our handleScroll to create an infinite scroll
    this.scrollListener = window.addEventListener('scroll', e => this.handleScroll(e));
  }

  fetchData = () => {
    const { filter, fetchStoriesFromApi } = this.props;
    fetchStoriesFromApi(filter);
  };

  fetchOld = () => {
    const { fetchOldStories, requestStories, isFetching } = this.props;
    if (isFetching) return; // stop a user from over fetching
    const filter = 'all';
    requestStories(filter);
    let delayedFetchOldStories = debounce(fetchOldStories, 3000);
    delayedFetchOldStories(filter);
  };

  handleScroll = () => {
    // To create an infinite scroll we'll look at the last story item and bottom
    // of the page - if a user scrolls beyond this point the offset will be
    // larger and we'll trigger a fetch of the older stories
    const lastStory = document.querySelector('.story-list > div:last-child');
    const lastStoryOffset = lastStory.offsetTop + lastStory.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastStoryOffset) this.fetchOld();
  };

  render() {
    const { isFetching, stories } = this.props;
    if (isFetching && !stories.length) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <div className="story-list">
          {stories &&
            stories.map(story => <StoryItem key={story.id} {...story} />)}
        </div>
        {isFetching ? <p className="loading">Loading more stories</p> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  // In future versions, we can easily change filter to different types of stories
  // such as ask and show, and update this with router params or onClick handlers
  const filter = 'visible';
  return {
    stories: getStoriesByFilter(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestStories: filter => dispatch(requestStories(filter)),
    fetchStoriesFromApi: filter => dispatch(fetchStoriesFromApi(filter)),
    fetchOldStories: filter => dispatch(fetchOlderStoriesFromApi(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryList);



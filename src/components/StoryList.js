import React from 'react';
import { connect } from 'react-redux';
import {
  fetchStoriesFromApi, requestStories, fetchOlderStoriesFromApi
} from '../store/actions';
import { getIsFetching, getStoriesByFilter } from '../store/reducers'
import StoryItem from './StoryItem';
class StoryList extends React.Component {
  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 5000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, fetchStoriesFromApi } = this.props;
    fetchStoriesFromApi(filter);
  }

  fetchOld = () => {
    const { fetchOldStories, requestStories } = this.props;
    let filter = 'all';
    requestStories(filter);
    fetchOldStories(filter)
  }

  render() {
    const { isFetching, stories } = this.props;
    if (isFetching && !stories.length) {
      return <p>Loading...</p>;
    }

    return (
      <div className="story-list">
        {stories && stories.map(story => (
          <StoryItem key={story.id} {...story} />
        ))}
        {
          isFetching ? (<p>Loading more stories</p>) : null
        }
        <button onClick={this.fetchOld}>Old</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const filter = 'visible';
  return {
    stories: getStoriesByFilter(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestStories: (filter) => dispatch(requestStories(filter)),
    fetchStoriesFromApi: (filter) => dispatch(fetchStoriesFromApi(filter)),
    fetchOldStories: (filter) => dispatch(fetchOlderStoriesFromApi(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryList);

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
    // setInterval(this.props.getStories, 15000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchStoriesFromApi, requestStories } = this.props;
    requestStories(filter);
    fetchStoriesFromApi(filter, true);
  }

  fetchOld = () => {
    const { fetchOldStories, requestStories } = this.props;
    let filter = 'all';
    requestStories(filter);
    fetchOldStories(filter)
  }
  // fetchNew() {
  //   const { fetchStoriesFromApi, requestStories } = this.props;
  //   let filter = 'new';
  //   requestStories(filter);
  //   fetchStoriesFromApi(filter)
  // }

  render() {
    const { isFetching, stories } = this.props;
    if (isFetching && !stories.length) {
      return <p>Loading...</p>;
    }

    return (
      <div className="story-list">
        {this.props.stories.map(story => (
          <StoryItem key={story.id} {...story} />
        ))}
        <button onClick={this.fetchOld}>Old</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // need to manage scrolling state. If scrolling filter = old, if periodic filter = new
  // for now well display all
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
    fetchStoriesFromApi: (filter, firstLoad) => dispatch(fetchStoriesFromApi(filter, firstLoad)),
    fetchOldStories: (filter) => dispatch(fetchOlderStoriesFromApi(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryList);

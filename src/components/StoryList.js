import React from 'react';
import { connect } from 'react-redux';
import {
  fetchStoriesFromApi, requestStories
} from '../store/actions';
import { getIsFetching, getVisibleStories } from '../store/reducers'
import StoryItem from './StoryItem';
class StoryList extends React.Component {
  componentDidMount() {
    // this.props.getStories()
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
    fetchStoriesFromApi(filter);
    ///e
    // fetchStoriesFromApi(filter).then(stories => {
    //   getStories(filter, stories);
    // });
  }

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
      </div>
    );
  }
}

const mapStateToProps = state => {
  // need to manage scrolling state. If scrolling filter = old, if periodic filter = new
  // for now well display all
  const filter = 'all';
  return {
    stories: getVisibleStories(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestStories: (filter) => dispatch(requestStories(filter)),
    fetchStoriesFromApi: (filter) => dispatch(fetchStoriesFromApi(filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryList);

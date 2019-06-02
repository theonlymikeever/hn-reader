import React from 'react'
import { connect } from 'react-redux';
import { fetchStoriesFromApi } from '../store/actions';
import StoryItem from './StoryItem';
class StoryList extends React.Component {
  componentDidMount() {
    this.props.getStories()
    setInterval(this.props.getStories, 15000)
  }

  render(){
    return (
      <div className="story-list">
          {
            this.props.stories.map(story => <StoryItem key ={story.id} {...story} />)
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { stories: state.stories, isFetching: state.isFetching }
}

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(fetchStoriesFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);


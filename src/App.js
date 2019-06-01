import React from 'react';
import './App.scss';
import StoryList from './components/StoryList';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>
          HN Reader
        </h1>
        <p>a mobile friendly hacker news feed</p>
      </header>
      <StoryList />
    </div>
  );
}

export default App;

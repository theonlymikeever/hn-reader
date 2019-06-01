import React from 'react';
import './App.css';
import StoryList from './components/StoryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          HN Reader
        </h1>
        <p>a mobile friendly hacker news feed</p>
        <StoryList />
      </header>
    </div>
  );
}

export default App;

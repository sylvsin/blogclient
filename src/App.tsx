import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Posts from './components/BlogPosts/Posts';
import CreatePost from './components/CreatePost/CreatePost';
import Nav from './components/Nav/Nav';
import Post from './components/Post/Post';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

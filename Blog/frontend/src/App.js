import './App.css';
import { useEffect, useState } from 'react';

import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Header } from './components/header/Header';
import { Posts } from './components/posts/Posts'
import axios from 'axios'

function App() {
  
  const [posts , setPosts] = useState([]);

  useEffect( () => {
    axios.get('http://127.0.0.1:8000/api/posts')
    .then(response => setPosts(response.data))
    .catch(error => console.log('error is ',error))
  });
  
  /*useEffect( () => {
    fetch('http://127.0.0.1:8000/api/users')
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.log('error is ',error))
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.log('error is' ,error))
});*/


  return (
    <div className="App">
      <Topbar />
      <Header />
      <Posts  posts={posts} />
      <Sidebar />
    </div>
  );
}

export default App;

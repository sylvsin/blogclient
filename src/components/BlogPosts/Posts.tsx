import './BlogPost.css';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IPost {
  id: number;
  title: string;
  postText: string;
  username: string;
}


const Posts: React.FC = () => {
  const [ posts, setPosts ] = useState<IPost[]>([]);
  let navigate = useNavigate(); 

  const fetchPosts = useCallback(() => {
    axios.get("https://lspost.herokuapp.com/api/posts")
    .then(resp => resp.data)
    .then(data => {
      setPosts(data)
    })
  },[]);

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);

  return (
    <div>
      <ul className='posts'>
      {
        posts.map(post => {
          return(
            <div key={post.id} onClick={() => {navigate(`/post/${post.id}`)}} className='single-post'>
              <li className='title'>{post.title}</li>
              <br /><br />
            </div>
          )
        })
      }
      </ul>
    </div>
  );
}

export default Posts;

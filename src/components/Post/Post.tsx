import './Post.css';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

interface IPostCreated {
    id: number;
    title: string;
    postText: string;
    username: string;
}

interface IPostComment {
    // id: number;
    commentBody: string;
    // PostId: number;
}

const Post: React.FC = () => {
    const { id } = useParams();
    const [ postCreated, setPostCreated ] = useState<IPostCreated>();
    const [ comments, setComments ] = useState<IPostComment[]>([]);
    const [ newComment, setNewComment ] = useState("");

    const fetchPost = useCallback(() => {
        axios.get(`https://lspost.herokuapp.com/api/posts/byId/${id}`)
        .then(resp => resp.data)
        .then(data => {
            // console.log(data)
            setPostCreated(data)
        })
    },[id]);

    useEffect(() => {
       fetchPost()
    }, [fetchPost]);

    const fetchComments = useCallback(() => {
        axios.get(`https://lspost.herokuapp.com/api/comments/${id}`)
        .then(resp => resp.data)
        .then(data => {
            setComments(data)
        })
    }, [id]);

    useEffect(() => {
        fetchComments()
    }, [fetchComments]);

    const addComment = () => {
        axios.post(`https://lspost.herokuapp.com/api/comments/`, {commentBody: newComment, PostId: id})
        .then(resp => resp.data)
        .then(data => {
           const commentToAdd = { commentBody: newComment };
            setComments([...comments,  commentToAdd]);
        })
    }

    return (
        <div className='postItem'>
            <div>
                <ul className='leftSide'>
                    <li className='post-t'>Title: {postCreated?.title}</li>
                    <li className='post-body'>{postCreated?.postText}</li>
                    <li className='post-t'>Author: {postCreated?.username}</li>
                </ul>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <textarea placeholder='Comment...' autoComplete='off' onChange={event => {setNewComment(event.target.value)}} /><br/>
                    <button onClick={addComment} className='add-comment'>Add Comment</button>
                </div>
                <div className="listOfComments">
                    <h4>Comments</h4>
                    {
                        comments.map((comment, key) => {
                            return(
                                <ul key={key} className="comments">
                                    <li>{ comment.commentBody }</li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Post;


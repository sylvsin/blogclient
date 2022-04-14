import './CreatePost.css';

import React from 'react';

import axios from 'axios';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const CreatePost: React.FC = () => {
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }


    const validationSchema = yup.object().shape({
        title: yup.string().required("Sorry, you must enter a title!"),
        postText: yup.string().required("Sorry, you must provide a text!"),
        username: yup.string()
    }); 

    let navigate = useNavigate();

    const onSubmit = (data: any) => {
        axios.post("https://lspost.herokuapp.com/posts", data)
        .then(resp => resp.data)
        .then(data => {
            navigate("/")
        })
    }

    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <br /><label htmlFor="title">Title: </label>
                    <ErrorMessage name='title' component='span' className='errormessage'/><br />
                    <Field as='textarea' autoComplete="off" id="inputCreatePost" name="title" placeholder="Title" /><br /><br /> 
                
                    <label htmlFor="postText">Post: &nbsp;</label>
                    <ErrorMessage name='postText' component='span' className='errormessage'/><br />
                    <Field as="textarea" autoComplete="off" id="inputCreatePost" name="postText" placeholder="Text" /><br /><br /> 
                
                    <label htmlFor="username">Author: &nbsp;</label>
                    <ErrorMessage name='username' component='span' className='errormessage'/><br />
                    <Field autoComplete="off" id="inputCreatePost" name="Author" placeholder="Author" /><br /><br /> 

                    <button type='submit'>Add Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;

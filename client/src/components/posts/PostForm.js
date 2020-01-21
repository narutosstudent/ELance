import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../redux/post/post.actions';

const PostForm = ({addPost}) => {
    const [text,
        setText] = useState('');

    return (
        <div className='post-form'>
            <div className='text-primary'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-4'
                onSubmit={e => {
                e.preventDefault();
                addPost({text});
                setText('');
            }}>

                <div className="container">
                    <div className="row ">
                        <div className="col-sm-8">
                            <textarea
                                name='text'
                                className="form-control"
                                placeholder='Create a post'
                                value={text}
                                onChange={e => setText(e.target.value)}
                                required/>
                        </div>
                        <div className="col-sm-4 align-items-center">
                            <input type='submit' className='btn btn-dark mb-5 ml-2' value='Submit'/>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default connect(null, {addPost})(PostForm);
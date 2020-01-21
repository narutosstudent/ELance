import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../redux/comment/comment.actions';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='container'>
        <div className="row">
        <div className="col text-center">
         <div>
        <h4>Leave a Comment</h4>
      </div>
      <form
        className='form my-1 d-flex flex-row align-items-center justify-content-center'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          className="form-control bg-info text-light"
          placeholder='Comment the post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-outline-info ml-3' value='Submit' />
      </form>
    </div>
        </div>
        </div>
     
  );
};

export default connect(
  null,
  { addComment }
)(CommentForm);
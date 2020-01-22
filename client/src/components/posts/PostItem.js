import React, { Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, dislikePost, deletePost, updatePost } from '../../redux/post/post.actions';
import defaultUserImage from "../../assets/default-user-icon.jpg";

const PostItem = ({
  dislikePost,
  likePost,
  deletePost,
  updatePost,
  auth,
  post: { _id, text, name, user, likes, dislikes, date },
  showActions
}) => {
  const [textInput, setTextInput] = useState(text)
  const [editMode, setEditMode] = useState(false);

  const onChange = e =>
  setTextInput(e.target.value);

return (
  <div class="shadow p-3 mb-5 bg-primary rounded">
  <div className='card mb-3 text-dark bg-warning'>
    <div className="row no gutters align-items-center">
    <div className="col-sm-3">
      <Link to={`/profile/${user._id}`}>
        <img className='card-img rounded-circle pl-2' src={user.avatar ? user.avatar : defaultUserImage} alt='avatar' />
      </Link>
      </div>
      <div className="col-sm-9">
        <div className="card-body">
        <h3 className="card-title"> {user.name} </h3>
        {editMode ? (
          <input className="form-control bg-danger" name="textInput" type="text" value={textInput} onChange={e => onChange(e)}  />
        ) : (
          <p className="card-text"> {text} </p>
          )}
        
        <p class="card-text"><small class="text-muted">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></small></p>
              {showActions && (
        <Fragment>
          <button
            onClick={() => likePost(_id)}
            type='button'
            className='btn btn-primary'
          >
            <i className='fas fa-thumbs-up p-1' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => dislikePost(_id)}
            type='button'
            className='btn btn-danger ml-3'
          >
            <i className='fas fa-thumbs-down p-1' />
            <span>{dislikes.length > 0 && <span>{dislikes.length} </span> } </span>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary ml-3'>
            Discussion
          </Link>
          {!auth.loading && user._id === auth.user._id && (
            <Fragment>
              {editMode && (
                <button 
                type="button" 
                onClick={() => {
                  updatePost(textInput, _id);
                  setEditMode(false);
                }}
                className="btn btn-success m-2 p-3">
                Submit
                </button>
              )}
                        <button
            onClick={() => setEditMode(!editMode)}
            type='button'
            className='btn btn-info ml-3 px-3'
          >
            <i className='fas fa-edit' />
          </button>
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-dark ml-1'
            >
              <i className='fas fa-times' />
            </button>
          </Fragment>
          )}
        </Fragment>
      )}
        </div>
      </div>
    </div>
    <div>
  </div>
  </div>
  </div>
);

}
PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { likePost, dislikePost, deletePost, updatePost }
)(PostItem);
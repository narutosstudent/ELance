import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, dislikePost, deletePost } from '../../redux/post/post.actions';
import defaultUserImage from "../../assets/default-user-icon.jpg";
import {getComments} from "../../redux/comment/comment.actions"

const PostItem = ({
  dislikePost,
  getComments,
  likePost,
  deletePost,
  auth,
  post: { _id, text, name, user, likes, dislikes, date },
  comment: {comments},
  showActions
}) => {
  useEffect(() => {
    getComments(_id);
  }, [getComments])
return (
  <div class="shadow p-3 mb-5 bg-primary rounded">
  <div className='card mb-3 text-dark bg-warning'>
    <div className="row no gutters align-items-center">
    <div className="col-sm-3">
      <Link to={`/profile/${user._id}`}>
        <img className='card-img' src={user.avatar ? user.avatar : defaultUserImage} alt='avatar' />
      </Link>
      </div>
      <div className="col-sm-9">
        <div className="card-body">
        <h3 className="card-title"> {user.name} </h3>
        <p className="card-text"> {text} </p>
        <p class="card-text"><small class="text-muted">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></small></p>
              {showActions && (
        <Fragment>
          <button
            onClick={() => likePost(_id)}
            type='button'
            className='btn btn-primary'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => dislikePost(_id)}
            type='button'
            className='btn btn-danger ml-3'
          >
            <i className='fas fa-thumbs-down' />
            <span>{dislikes.length > 0 && <span>{dislikes.length} </span> } </span>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary ml-3'>
            Discussion{' '}
            {comments.length > 0 && (
              <span>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user._id === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-dark ml-3'
            >
              <i className='fas fa-times' />
            </button>
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
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { likePost, dislikePost, deletePost, getComments }
)(PostItem);
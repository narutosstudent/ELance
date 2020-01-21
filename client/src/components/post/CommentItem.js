import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../redux/comment/comment.actions';
import defaultUserImage from "../../assets/default-user-icon.jpg"

const CommentItem = ({
  comment: { _id, text, user, date },
  auth,
  deleteComment
}) => (
    
    <div class="card m-5 bg-warning">
  <div class="row no-gutters align-items-center">
    <div class="col-md-2">
    <Link to={`/profile/${user._id}`}>
            <img className='card-img rounded-circle pl-2' src={user.avatar ? user.avatar : defaultUserImage} alt='' />
            </Link>
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <h5 class="card-title text-center">{user.name}</h5>
        <p class="card-text">{text}</p>
        <p class="card-text"><small class="text-muted">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
</small></p>
      {!auth.loading && user._id === auth.user._id && (
        <button
          onClick={() => deleteComment(_id)}
          type='button'
          className='btn btn-danger float-right mb-4'
        >
          <i className='fas fa-times' />
        </button>
      )}
      </div>
    </div>
  </div>
</div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
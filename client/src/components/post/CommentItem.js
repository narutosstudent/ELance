import React, {useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteComment, updateComment} from '../../redux/comment/comment.actions';
import defaultUserImage from "../../assets/default-user-icon.jpg";


const CommentItem = ({
  comment: { _id, text, user, date },
  auth,
  deleteComment,
  updateComment
}) => {
  const [textInput, setTextInput] = useState(text)
  const [editMode, setEditMode] = useState(false);

  const onChange = e =>
  setTextInput(e.target.value);

return (
    <div class="card m-5 bg-warning">
  <div class="row no-gutters align-items-center">
    <div class="col-md-2">
    
    {user.avatar && (
      <Link to={`/profile/${user._id}`}>
                  <img className='card-img rounded-circle pl-2' src={user.avatar} alt='' />
                  </Link>
    )}

            
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <h5 class="card-title text-center">{user.name}</h5>
        {editMode ? (
          <input className="form-control bg-danger" name="textInput" type="text" value={textInput} onChange={e => onChange(e)}  />
        ) : (
          <p className="card-text"> {text} </p>
          )}
        <p class="card-text"><small class="text-muted">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
</small></p>
      {!auth.loading && user._id === auth.user._id && (
        <Fragment>
        {editMode && (
          <button 
          type="button" 
          onClick={() => {
            updateComment(textInput, _id);
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
          onClick={() => deleteComment(_id)}
          type='button'
          className='btn btn-danger float-right mb-4'
        >
          <i className='fas fa-times' />
        </button>
        </Fragment>
      )}
      </div>
    </div>
  </div>
</div>
);

}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment, updateComment }
)(CommentItem);
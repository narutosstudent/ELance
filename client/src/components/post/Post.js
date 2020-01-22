import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../redux/post/post.actions';
import {getSinglePostComments} from "../../redux/comment/comment.actions"

const Post = ({ getPost, getSinglePostComments, post: { post, loading }, comment, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    getSinglePostComments(match.params.id)
  }, [comment.comments, getPost, getSinglePostComments]);

  return loading || comment.loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-info m-3'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {comment.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getPost, getSinglePostComments }
)(Post);
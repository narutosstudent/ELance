import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/post/post.actions';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [posts, getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className="container">
    <div className="row">
    <div className="col text-center">
          <h1 className='text-primary'>Posts</h1>
      <p className='lead text-danger'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
          </div>
    </div>
    </div>

      <div className='container'>
      <div className="row">
       {posts.map(post => (
          <div className="col-md-12">
                    <PostItem key={post._id} post={post} />
          </div>
        ))}
      </div>
      </div>


    </Fragment>
  );
};


const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
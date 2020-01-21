import React from 'react';
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }
    return (
        <section id="showcase">
        <div className="overlay text-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="display-2 mt-5 pt-5">
                  Connect With Other Freelancers!
                </h1>
                <p className="lead">Share, Learn & Earn!</p>
                <Link to="/register" className="btn mr-3 btn-outline-secondary btn-md text-white">
                 Sign Up
                </Link>
                <Link to="/login" className="btn btn-outline-secondary btn-md text-white">
                Sign In
               </Link>
              </div>
            </div>
          </div>
        </div> 
        </section>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);

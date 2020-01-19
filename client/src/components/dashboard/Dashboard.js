import React, {useEffect, Fragment} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../redux/profile/profile.actions";
import {Link} from "react-router-dom"
import Spinner from "../layout/Spinner";

const Dashboard = ({
    getCurrentProfile,
    user: {
        user
    },
    profile: {
        profile,
        loading
    }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    return loading && profile === null
        ? <Spinner/>
        : <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="display-1">Dashboard</h1>
                        <p className="lead">
                            <i className="fas fa-user"/>
                            Welcome {user && user.name}
                        </p>
                    </div>
                </div>
            </div>

            {profile !== null
                ? (
                    <Fragment>has</Fragment>
                )
                : (
                    <Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <p>You have not yet setup a profile, please add some info</p>
                                    <Link to='/create-profile' className='btn btn-primary my-1'>
                                        Create Profile
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )}
        </Fragment>
}

const mapStateToProps = state => ({user: state.user, profile: state.profile})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);

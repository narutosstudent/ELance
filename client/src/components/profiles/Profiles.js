import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../redux/profile/profile.actions';

const Profiles = ({
    getProfiles,
    profile: {
        profiles,
        loading
    }
}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading
                ? (<Spinner/>)
                : (
                    <Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <h1 className='display-1 text-primary'>ELancers</h1>
                                    <p className='lead'>
                                        <i className='fab fa-connectdevelop'/>
                                        Browse and connect with Freelancers
                                    </p>
                                    <div className='col-md-8 col-sm-9'>
                                        {profiles.length > 0
                                            ? (profiles.map(profile => (
                                                
                                                <ProfileItem key={profile._id} profile={profile}/>
                                                
                                                )))
                                            : (
                                                <h4>No profiles found...</h4>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )}
        </Fragment>
    );
};

const mapStateToProps = state => ({profile: state.profile});

export default connect(mapStateToProps, {getProfiles})(Profiles);
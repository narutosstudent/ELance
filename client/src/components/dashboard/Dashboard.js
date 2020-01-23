import React, {useEffect, Fragment, useState} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile, deleteAccount} from "../../redux/profile/profile.actions";
import {Link} from "react-router-dom"
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions"
import Experience from './Experience';
import Education from './Education';
import defaultUserImage from "../../assets/default-user-icon.jpg";
import {updateUserImage} from "../../redux/user/user.actions";

const Dashboard = ({
    deleteAccount,
    getCurrentProfile,
    updateUserImage,
    auth: {
        user
    },
    profile: {
        profile,
        loading
    }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const [file, setFile] = useState('');
    const [imageFile, setImageFile] = useState(false);

    const onChange = e => {
        setFile(e.target.files[0]);
        setImageFile(!imageFile);
      };

      const onSubmit = e => {
          e.preventDefault();
          updateUserImage(file);
      }

    return loading && profile === null
        ? <Spinner/>
        : <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="display-1 text-warning">Dashboard</h1>
                        <p className="lead text-info">
                            <i className="fas fa-user"/>
                            Welcome {user && user.name}
                        </p>
                        <div className="col sm-5">
                                                <img src={user.avatar ? user.avatar : defaultUserImage} alt="avatar" className="border border-success rounded-circle m-2" />
                        </div>
                        <form onSubmit={onSubmit}>
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Image</span>
                        </div>
                        <div class="custom-file">
                          <input type="file" onChange={e => onChange(e)} class="custom-file-input bg-info" />
                          <label class="custom-file-label">Upload Image</label>
                        </div>
                      </div>
                      {imageFile && (
                                               <input type="submit" value="Submit Upload" className="btn btn-info btn-block m-2" /> 
                      )}

                        </form>
                    </div>
                </div>
            </div>

            {profile !== null
                ? (
                    <Fragment>
                        <DashboardActions/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>

                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <div className="my-2">
                                        <button className="btn-danger" onClick={() => deleteAccount()}>
                                            <i className="fas fa-user-minus text-dark"/>
                                            Delete My Account
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </Fragment>
                )
                : (
                    <Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <p>You have not yet setup a profile, please add some info</p>
                                    <Link to='/create-profile' className='btn btn-info my-1'>
                                        Create Profile
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )}
        </Fragment>
}

const mapStateToProps = state => ({auth: state.auth, profile: state.profile})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount, updateUserImage})(Dashboard);

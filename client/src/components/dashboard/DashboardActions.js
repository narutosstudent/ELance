import React from 'react';
import {Link} from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <div className='dash-buttons'>
                        <Link to='/edit-profile' className='btn bg-warning btn-light m-2'>
                            <i className='fas fa-user-circle text-primary pr-2'/>
                            Edit Profile
                        </Link>
                        <Link to='/add-experience' className='btn bg-info text-danger btn-light m-2'>
                            <i className='fab fa-black-tie text-primary pr-2'/>
                            Add Experience
                        </Link>
                        <Link to='/add-education' className='btn bg-danger btn-light m-2'>
                            <i className='fas fa-graduation-cap text-primary pr-2'/>
                            Add Education
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DashboardActions;

import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import defaultUserImage from "../../assets/default-user-icon.jpg"

const ProfileItem = ({
    profile: {
        user: {
            _id,
            name,
            avatar
        },
        status,
        company,
        location,
        skills
    }
}) => {
    return (
        <Fragment>
            <div class="card mb-3 bg-warning">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-4">
                        <img
                            src={avatar
                            ? avatar
                            : defaultUserImage}
                            className="card-img rounded-circle pl-2"
                            alt="user"/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-dark text-center">{name}</h5>
                            <p class="card-text text-dark">{status} {company && <span>
                                    at {company}</span>}</p>
                            <p>
                                {location && <span className="text-dark">{location}</span>}
                            </p>
                            <ul className="list-unstyled d-flex flex-row justify-content-center">
                                {skills
                                    .slice(0, 4)
                                    .map((skill, index) => (
                                        <li key={index} className='text-danger ml-2'>
                                            <i className='fas fa-check'/> {skill}
                                        </li>
                                    ))}
                            </ul>
                            <div className="text-center">
                                <Link to={`/profile/${_id}`} className='text-center btn btn-dark'>
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProfileItem;
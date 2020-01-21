import React from 'react';
import defaultUserImage from "../../assets/default-user-icon.jpg"

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: {
            name,
            avatar
        }
    }
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <div className='bg-warning p-2'>
                        <img className='rounded-circle my-1' src={avatar ? avatar : defaultUserImage} alt=''/>
                        <h1 className='large'>{name}</h1>
                        <p className='lead'>
                            {status}
                            {company && <span>
                                at {company}</span>}
                        </p>
                        <p>{location && <span>{location}</span>}</p>
                        <div className='icons m-2'>
                            {website && (
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    <i className='fas fa-globe fa-2x p-2'/>
                                </a>
                            )}
                            {social && social.twitter && (
                                <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-twitter fa-2x p-2'/>
                                </a>
                            )}
                            {social && social.facebook && (
                                <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-facebook fa-2x p-2'/>
                                </a>
                            )}
                            {social && social.linkedin && (
                                <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-linkedin fa-2x p-2'/>
                                </a>
                            )}
                            {social && social.youtube && (
                                <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-youtube fa-2x p-2'/>
                                </a>
                            )}
                            {social && social.instagram && (
                                <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
                                    <i className='fab fa-instagram fa-2x p-2'/>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfileTop;
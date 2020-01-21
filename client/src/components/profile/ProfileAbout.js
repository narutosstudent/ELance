import React, { Fragment } from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className='bg-success p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-dark'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-dark'>Skill Set</h2>
    <div className='skills d-flex flex-row justify-content-center'>
      {skills.map((skill, index) => (
        <div key={index} className='p-2'>
          <i className='fas fa-check' /> {skill}
        </div>
      ))}
    </div>
  </div>
);

export default ProfileAbout;
import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {getCurrentProfile, createProfile} from "../../redux/profile/profile.actions"

const EditProfile = ({
    createProfile,
    getCurrentProfile,
    profile: {
        profile,
        loading
    },
    history
}) => {
    const [formData,
        setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs,
        toggleSocialInputs] = useState(false);



    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
          });
        
    }, [loading, getCurrentProfile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
      };
    return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col text-centered">
                            <h1 className='large text-primary'>Edit Your Profile</h1>
                            <p className='lead'>
                                <i className='fas fa-user'/>
                                Add some changes to your profile
                            </p>
                            <small>* = required field</small>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                    <select
                                        name='status'
                                        className="form-control"
                                        value={status}
                                        onChange={e => onChange(e)}>
                                        <option value='0'>* Select Professional Status</option>
                                        <option value='Developer'>Developer</option>
                                        <option value='Web Developer'>App Developer</option>
                                        <option value='App Developer'>App Developer</option>
                                        <option value='Database Engineer'>Database Engineer</option>
                                        <option value='Video Editer'>Video Editer</option>
                                        <option value='Designer'>Designer</option>
                                        <option value='Graphic Designer'>Graphic Designer</option>
                                        <option value='Animater'>Animater</option>
                                        <option value='Graphic Designer'>Graphic Designer</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                    <small className='form-text'>
                                        Give us an idea of what you do
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control"
                                        type='text'
                                        placeholder='Company'
                                        name='company'
                                        value={company}
                                        onChange={e => onChange(e)}/>
                                    <small className='form-text'>
                                        Could be your own company or one you work for
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control"
                                        type='text'
                                        placeholder='Website'
                                        name='website'
                                        value={website}
                                        onChange={e => onChange(e)}/>
                                    <small className='form-text'>
                                        Could be your own or a company website
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control"
                                        type='text'
                                        placeholder='Location'
                                        name='location'
                                        value={location}
                                        onChange={e => onChange(e)}/>
                                    <small className='form-text'>
                                        City & state suggested (eg. San Francisco, CA)
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control"
                                        type='text'
                                        placeholder='* Skills'
                                        name='skills'
                                        value={skills}
                                        onChange={e => onChange(e)}/>
                                    <small className='form-text'>
                                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                                    </small>
                                </div>
                                <div className='form-group'>
                                    <textarea
                                        className="form-control"
                                        placeholder='A short bio of yourself'
                                        name='bio'
                                        value={bio}
                                        onChange={e => onChange(e)}/>
                                    <small className='form-text'>Tell us a little about yourself</small>
                                </div>

                                <div className='my-2'>
                                    <button
                                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                        type='button'
                                        className='btn btn-dark'>
                                        Add Social Network Links
                                    </button>
                                    <span>Optional</span>
                                </div>
                                {displaySocialInputs && (
                                    <Fragment>
                                        <div className='form-group social-input'>
                                            <i className='fab fa-twitter fa-2x'/>
                                            <input
                                                className="form-control"
                                                type='text'
                                                placeholder='Twitter URL'
                                                name='twitter'
                                                value={twitter}
                                                onChange={e => onChange(e)}/>
                                        </div>

                                        <div className='form-group social-input'>
                                            <i className='fab fa-facebook fa-2x'/>
                                            <input
                                                className="form-control"
                                                type='text'
                                                placeholder='Facebook URL'
                                                name='facebook'
                                                value={facebook}
                                                onChange={e => onChange(e)}/>
                                        </div>

                                        <div className='form-group social-input'>
                                            <i className='fab fa-youtube fa-2x'/>
                                            <input
                                                className="form-control"
                                                type='text'
                                                placeholder='YouTube URL'
                                                name='youtube'
                                                value={youtube}
                                                onChange={e => onChange(e)}/>
                                        </div>

                                        <div className='form-group social-input'>
                                            <i className='fab fa-linkedin fa-2x'/>
                                            <input
                                                className="form-control"
                                                type='text'
                                                placeholder='Linkedin URL'
                                                name='linkedin'
                                                value={linkedin}
                                                onChange={e => onChange(e)}/>
                                        </div>

                                        <div className='form-group social-input'>
                                            <i className='fab fa-instagram fa-2x'/>
                                            <input
                                                className="form-control"
                                                type='text'
                                                placeholder='Instagram URL'
                                                name='instagram'
                                                value={instagram}
                                                onChange={e => onChange(e)}/>
                                        </div>
                                    </Fragment>
                                )}

                                <input type='submit' className='btn mr-3 btn-primary my-1'/>
                                <Link className='btn btn-light my-1' to='/dashboard'>
                                    Go Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
}

const mapStateToProps = state => ({profile: state.profile})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));

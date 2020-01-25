import React, {Fragment, useState} from 'react';
import {sendEmail} from "../../redux/user/user.actions";
import {connect} from "react-redux";

const ProfileAbout = ({
    sendEmail,
    auth: {
        user
    },
    profile: {
        bio,
        skills,
        user: {
            name,
            _id
        }
    }
}) => {
    const [formData,
        setFormData] = useState({subject: '', text: ''});

    const {subject, text} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        sendEmail({
            subject,
            text
        }, _id);
        setFormData({
            subject: "",
            text: ""
        });
    }

    return (
        <div className='bg-success p-2'>
            {bio && (
                <Fragment>
                    <h2 className='text-dark'>{name
                            .trim()
                            .split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                    <div className='line'/>
                </Fragment>
            )}
            <h2 className='text-dark'>Skill Set</h2>
            <div className='skills d-flex flex-row justify-content-center'>
                {skills.map((skill, index) => (
                    <div key={index} className='p-2'>
                        <i className='fas fa-check'/> {skill}
                    </div>
                ))}
            </div>
            {user._id !== _id && (
                           <form onSubmit={onSubmit}>
                <h1>Contact Through Email</h1>
                <input
                    type="text"
                    value={subject}
                    name="subject"
                    className="form-control my-2"
                    placeholder="The Subject of the Email"
                    onChange={e => onChange(e)}
                    required/>
                    <textarea 
                    type="text" 
                    value={text} 
                    name="text" 
                    onChange={e => onChange(e)}
                    className="form-control my-2" 
                    placeholder="What do you want to say ?" 
                    required/>
                    <input type="submit" value="Send" className="btn btn-warning" />
            </form> 
            )}

        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {sendEmail})(ProfileAbout);